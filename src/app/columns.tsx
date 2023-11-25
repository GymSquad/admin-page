import { WebsiteInfo } from "@/db/websiteInfo";
import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
] as ColumnDef<WebsiteInfo>[];
