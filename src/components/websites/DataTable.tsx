import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { VirtualScrollPadding } from "./VirtualPadding";
import { websiteColumns } from "./columns";
import { useWebsiteInfo } from "./query";

export function DataTable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // const activeStickyIndexRef = useRef(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWebsiteInfo();

  const table = useReactTable({
    data: data?.tableRows ?? [],
    columns: websiteColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 53,
    getScrollElement: () => scrollRef.current,
    overscan: 5,
    // rangeExtractor: (range) => {
    //   activeStickyIndexRef.current =
    //     [...stickyIndexes]
    //       .reverse()
    //       .find((index) => index <= range.startIndex) ?? 0;

    //   const next = new Set([
    //     activeStickyIndexRef.current,
    //     ...defaultRangeExtractor(range),
    //   ]);

    //   return [...next].sort((a, b) => a - b);
    // },
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
    <div
      ref={scrollRef}
      className="relative h-full w-full overflow-auto rounded-md border"
    >
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" bg-gray-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ maxWidth: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <VirtualScrollPadding
              rowVirtualizer={rowVirtualizer}
              position="top"
            />
            {virtualItems.length ? (
              virtualItems.map((virtualRow) => {
                const row = rows[virtualRow.index];

                return row.original.indexRowTitle ? (
                  <TableRow key={row.id}>
                    <TableCell
                      colSpan={websiteColumns.length}
                      className="font-semibold text-slate-700"
                    >
                      {row.original.indexRowTitle}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ maxWidth: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={websiteColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            <VirtualScrollPadding
              rowVirtualizer={rowVirtualizer}
              position="bottom"
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
