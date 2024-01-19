import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Range,
  defaultRangeExtractor,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef } from "react";
import { websiteColumns } from "./WebsiteInfoColumns";
import { useWebsiteInfo } from "./query";

export function WebsiteInfoTable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStickyIndexRef = useRef(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWebsiteInfo();

  const isSticky = (index: number) => data?.indexRowIds.includes(index);

  const isActiveSticky = (index: number) => {
    return activeStickyIndexRef.current === index;
  };

  const table = useReactTable({
    data: data?.tableRows ?? [],
    columns: websiteColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 56,
    getScrollElement: () => scrollRef.current,
    overscan: 5,
    rangeExtractor: useCallback(
      (range: Range) => {
        const stickyIndexes = data?.indexRowIds ?? [];

        activeStickyIndexRef.current =
          [...stickyIndexes]
            .reverse()
            .find((index) => index <= range.startIndex) ?? 0;

        const next = new Set([
          activeStickyIndexRef.current,
          ...defaultRangeExtractor(range),
        ]);

        return [...next].sort((a, b) => a - b);
      },
      [data?.indexRowIds],
    ),
  });
  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (virtualItems.length === 0) {
      return;
    }
    const lastItem = virtualItems[virtualItems.length - 1];

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rows.length,
    virtualItems,
  ]);

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-t-md bg-gray-100 px-8">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="grid h-12 grid-cols-[2fr_5fr_1fr] items-center border-b transition-colors data-[state=selected]:bg-muted"
          >
            {headerGroup.headers.map((header) => {
              return (
                <div
                  key={header.id}
                  className="text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div
        ref={scrollRef}
        className="relative h-full w-full overflow-auto rounded-b-md border"
      >
        <div
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          className="relative"
        >
          {virtualItems.length ? (
            virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index];

              return row.original.indexRowTitle ? (
                <div
                  key={row.id}
                  className={cn(
                    "left-0 top-0 flex h-14 w-full items-center px-8 font-semibold",
                    {
                      "z-10 border-b border-gray-200 bg-muted": isSticky(
                        virtualRow.index,
                      ),
                      sticky: isActiveSticky(virtualRow.index),
                      absolute: !isActiveSticky(virtualRow.index),
                    },
                  )}
                  style={
                    isActiveSticky(virtualRow.index)
                      ? {}
                      : { transform: `translateY(${virtualRow.start}px)` }
                  }
                >
                  <p>{row.original.indexRowTitle}</p>
                </div>
              ) : (
                <div
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="absolute left-0 top-0 grid h-14 w-full grid-cols-[2fr_5fr_1fr] items-center border-b border-gray-200  px-8 hover:bg-muted/50"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <div>
              <div className="h-24 text-center">No results.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
