import { Website } from "@/api/getWebsiteInfo";
import { createColumnHelper } from "@tanstack/react-table";

export type WebsiteTableRow = Partial<Website> & { indexRowTitle?: string };

const columnHelper = createColumnHelper<WebsiteTableRow>();

export const websiteColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 100,
  }),
  columnHelper.accessor("url", {
    header: "URL",
    size: 200,
  }),
];
