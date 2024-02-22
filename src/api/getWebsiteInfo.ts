import { websiteInfoKeys } from "@/components/websites/query";
import { QueryFunctionContext } from "@tanstack/react-query";
import { apiClient } from ".";
import { paths } from "./types";

type GetWebsiteInfoAPI = paths["/api/website/search"]["get"];

export type SearchSuccessResponse =
  GetWebsiteInfoAPI["responses"]["200"]["content"]["application/json"];

export type SearchResultEntry = SearchSuccessResponse["result"][number];

export type Website = SearchResultEntry["websites"][number];

export type GetWebsiteInfoInput = GetWebsiteInfoAPI["parameters"]["query"];

export const getWebsiteInfo = async ({
  queryKey,
  pageParam: cursor,
}: QueryFunctionContext<
  ReturnType<typeof websiteInfoKeys.infos>,
  string | null | undefined
>) => {
  const [query] = queryKey;
  const response = await apiClient.GET("/api/website/search", {
    params: { query: { ...query, cursor } },
  });

  if (response.data) {
    return response.data;
  }

  throw new Error("Fail to get website info");
};
