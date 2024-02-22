import { websiteInfoKeys } from "@/components/websites/query";
import { QueryFunctionContext } from "@tanstack/react-query";
import { apiClient } from ".";
import { paths } from "./types";

export type GetWebsiteDetailAPI =
  paths["/api/website/{website_id}/details"]["get"];

export const getWebsiteDetail = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof websiteInfoKeys.detail>>) => {
  const { id } = queryKey[0];
  const response = await apiClient.GET("/api/website/{website_id}/details", {
    params: { path: { website_id: id } },
  });

  if (response.data) {
    return response.data;
  }

  throw new Error(`Fail to get website detail, id=${id}`);
};
