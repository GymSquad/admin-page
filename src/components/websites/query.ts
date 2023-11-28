import { GetWebsiteInfoInput, getWebsiteInfo } from "@/api/getWebsiteInfo";
import { useQuery } from "@tanstack/react-query";

export const useWebsiteInfo = () => {
  return useQuery({
    queryKey: websiteInfoKeys.all({}),
    queryFn: getWebsiteInfo,
    select: (data) => {
      return data.result.flatMap((info) => info.websites);
    },
  });
};

export const websiteInfoKeys = {
  all: (query: GetWebsiteInfoInput) =>
    [{ scope: "websiteInfo", ...query }] as const,
};
