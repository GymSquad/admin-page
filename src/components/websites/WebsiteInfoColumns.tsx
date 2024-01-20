import { Website } from "@/api/getWebsiteInfo";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";

import { WebsiteActionMenu } from "./WebsiteActionMenu";

export type WebsiteTableRow = Partial<Website> & { indexRowTitle?: string };

const columnHelper = createColumnHelper<WebsiteTableRow>();

export const websiteColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 300,
  }),
  columnHelper.accessor("url", {
    header: "URL",
    size: 500,
    cell: (row) => (
      <a
        href={row.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="align-middle text-gray-600 hover:text-gray-800 hover:underline"
      >
        {row.getValue()}
        <ExternalLink size={16} className="ml-2 inline-block" />
      </a>
    ),
  }),
  columnHelper.accessor("id", {
    header: "Action",
    size: 300,
    cell: (row) => {
      const websiteId = row.getValue();

      if (!websiteId) return null;
      return <WebsiteActionMenu id={websiteId} />;
    },
  }),
];
