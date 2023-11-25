import { apiClient } from ".";
import { paths } from "./types";

type SearchSuccessResponse =
  paths["/api/website/search"]["get"]["responses"]["200"]["content"]["application/json"];

export type Website =
  SearchSuccessResponse["result"][number]["websites"][number];

export const getWebsiteInfo = async () => {
  const response = await apiClient.GET("/api/website/search", {
    params: {
      query: {
        limit: 10,
      },
    },
  });

  if (response.error) {
    throw new Error(response.error.error);
  }

  return response.data;
};
