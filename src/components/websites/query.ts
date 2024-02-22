import { getWebsiteDetail } from "@/api/getWebsiteDetail";
import {
  GetWebsiteInfoInput,
  SearchSuccessResponse,
  getWebsiteInfo,
} from "@/api/getWebsiteInfo";
import { UseQueryOptions } from "@/lib/types";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { WebsiteTableRow } from "./WebsiteInfoColumns";

export const useWebsiteInfo = (options: GetWebsiteInfoInput = {}) => {
  return useInfiniteQuery({
    queryKey: websiteInfoKeys.infos(options),
    queryFn: getWebsiteInfo,
    initialPageParam: options.cursor,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.next_cursor ?? undefined;
    },
    select: groupWebsiteInfo,
  });
};

const groupWebsiteInfo = (data: InfiniteData<SearchSuccessResponse>) => {
  const all = data.pages.flatMap((page) => {
    return page.result;
  });

  let lastId = "";
  let currentCount = 0;
  const indexRowIds: number[] = [];

  const tableRows = all.flatMap((result) => {
    if (result.id === lastId) {
      currentCount += result.websites.length;
      return result.websites;
    }

    lastId = result.id;
    const indexRow = {
      indexRowTitle: `${result.campus} > ${result.department} > ${result.office}`,
    };

    indexRowIds.push(currentCount++);
    currentCount += result.websites.length;
    return [indexRow, ...result.websites];
  }) as WebsiteTableRow[];

  return {
    tableRows,
    indexRowIds,
  };
};

export const websiteInfoKeys = {
  all: [{ scope: "websiteInfo" }] as const,
  infos: ({
    q,
    limit,
  }: Omit<NonNullable<GetWebsiteInfoInput>, "cursor"> = {}) => {
    return [{ ...websiteInfoKeys.all[0], entity: "infos", q, limit }] as const;
  },
  details: () => [{ ...websiteInfoKeys.all[0], entity: "details" }] as const,
  detail: (id: string) => [{ ...websiteInfoKeys.details()[0], id }] as const,
};

type UseWebsiteDetailInput = { id: string };

type UseWebsiteDetailOptions<TData> = UseQueryOptions<
  Awaited<ReturnType<typeof getWebsiteDetail>>,
  Error,
  TData,
  ReturnType<typeof websiteInfoKeys.detail>
>;

export const useWebsiteDetail = <
  TData = Awaited<ReturnType<typeof getWebsiteDetail>>,
>(
  { id }: UseWebsiteDetailInput,
  options?: UseWebsiteDetailOptions<TData>,
) => {
  return useQuery({
    queryKey: websiteInfoKeys.detail(id),
    queryFn: getWebsiteDetail,
    ...options,
  });
};
