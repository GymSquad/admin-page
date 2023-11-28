import { websiteInfoKeys } from "@/components/websites/query";
import { QueryFunctionContext } from "@tanstack/react-query";
import { apiClient } from ".";
import { paths } from "./types";

type GetWebsiteInfoAPI = paths["/api/website/search"]["get"];

type SearchSuccessResponse =
  GetWebsiteInfoAPI["responses"]["200"]["content"]["application/json"];

export type Website =
  SearchSuccessResponse["result"][number]["websites"][number];

export type GetWebsiteInfoInput = GetWebsiteInfoAPI["parameters"]["query"];

export const getWebsiteInfo = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof websiteInfoKeys.all>>) => {
  const [query] = queryKey;
  const response = await apiClient.GET("/api/website/search", {
    params: { query },
  });

  if (response.error) {
    throw new Error(response.error.error);
  }

  return response.data;
};
