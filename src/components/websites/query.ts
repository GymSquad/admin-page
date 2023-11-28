import { GetWebsiteInfoInput, getWebsiteInfo } from "@/api/getWebsiteInfo";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useWebsiteInfo = (options: GetWebsiteInfoInput = {}) => {
  return useInfiniteQuery({
    queryKey: websiteInfoKeys.all(options),
    queryFn: getWebsiteInfo,
    initialPageParam: options.cursor,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.next_cursor ?? undefined,
    select: (data) => {
      return data.pages.flatMap((page) =>
        page.result.flatMap((r) => r.websites),
      );
    },
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
