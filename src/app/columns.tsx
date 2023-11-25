import { createColumnHelper } from "@tanstack/react-table";
import { Website } from "../api/getWebsiteInfo";

const columnHelper = createColumnHelper<Website>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("url", {
    header: "URL",
  }),
];
