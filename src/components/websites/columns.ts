import { Website } from "@/api/getWebsiteInfo";
import { createColumnHelper } from "@tanstack/react-table";

export type WebsiteTableRow = Partial<Website> & { indexRowTitle?: string };

const columnHelper = createColumnHelper<WebsiteTableRow>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("url", {
    header: "URL",
  }),
];
