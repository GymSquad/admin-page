import {
  GetWebsiteInfoInput,
  SearchSuccessResponse,
  getWebsiteInfo,
} from "@/api/getWebsiteInfo";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export const useWebsiteInfo = (options: GetWebsiteInfoInput = {}) => {
  return useInfiniteQuery({
    queryKey: websiteInfoKeys.all(options),
    queryFn: getWebsiteInfo,
    initialPageParam: options.cursor,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.next_cursor ?? undefined,
    select: groupWebsiteInfo,
  });
};

const groupWebsiteInfo = (data: InfiniteData<SearchSuccessResponse>) => {
  const all = data.pages.flatMap((page) => page.result);

  let lastId = "";
  return all.flatMap((result) => {
    if (result.id === lastId) {
      return result.websites;
    }
    lastId = result.id;
    const indexRow = {
      indexRowTitle: `${result.campus} > ${result.department} > ${result.office}`,
    };
    return [indexRow, ...result.websites];
  });
};

export const websiteInfoKeys = {
  all: ({
    q,
    limit,
  }: Omit<NonNullable<GetWebsiteInfoInput>, "cursor"> = {}) => {
    return [{ scope: "websiteInfo", q, limit }] as const;
  },
};
