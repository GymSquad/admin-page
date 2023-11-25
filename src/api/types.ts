/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export type paths = {
  "/api/website/{website_id}": {
    /**
     * Get archived dates
     * @description Get the archived dates of a website
     */
    get: {
      parameters: {
        path: {
          /** @description Website ID */
          website_id: string;
        };
      };
      responses: {
        /** @description Successful response */
        200: {
          content: {
            "application/json": components["schemas"]["ArchivedDates"];
          };
        };
        /** @description Website not found */
        404: {
          content: {
            "application/json": string;
          };
        };
      };
    };
    /**
     * Update website
     * @description Update the information of a website
     */
    patch: {
      parameters: {
        path: {
          /** @description Website ID */
          website_id: string;
        };
      };
      /** @description Website information to be updated */
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateWebsitePayload"];
        };
      };
      responses: {
        /** @description Successful response */
        200: {
          content: {
            "application/json": components["schemas"]["Website"];
          };
        };
      };
    };
  };
  "/api/website/search": {
    /**
     * Search websites
     * @description Search websites
     */
    get: {
      parameters: {
        query?: {
          /** @description Search query */
          q?: string;
          /** @description Cursor for pagination */
          cursor?: string;
          /** @description Limit for pagination */
          limit?: number;
        };
      };
      responses: {
        /** @description Successful response */
        200: {
          content: {
            "application/json": components["schemas"]["WebsiteSearchResult"];
          };
        };
        /** @description Invalid cursor or limit */
        400: {
          content: {
            "application/json": {
              /** @example Invalid cursor */
              error?: string;
            };
          };
        };
        /** @description Internal server error */
        500: {
          content: {
            "application/json": {
              /** @example Internal server error */
              error?: string;
            };
          };
        };
      };
    };
  };
};

export type webhooks = Record<string, never>;

export type components = {
  schemas: {
    ArchivedDates: string[];
    Affiliation: {
      /**
       * @description Campus name
       * @example 交大相關
       */
      campus: string;
      /**
       * @description Department name
       * @example 行政單位
       */
      department: string;
      /**
       * @description Office name
       * @example 圖書館
       */
      office: string;
    };
    Website: components["schemas"]["Affiliation"] & {
      /** @description Website ID */
      id: string;
      /**
       * @description Website name
       * @example 交通大學圖書館
       */
      name: string;
      /**
       * @description Website URL
       * @example http://www.lib.nctu.edu.tw/
       */
      url: string;
    };
    UpdateWebsitePayload: {
      /** @description Affiliations of the website */
      affiliation?: {
          /**
           * @description Campus name
           * @example 交大相關
           */
          campus: string;
          /**
           * @description Department name
           * @example 行政單位
           */
          department: string;
          /**
           * @description Office name
           * @example 圖書館
           */
          office: string;
        }[];
      /**
       * @description Website name
       * @example 交通大學圖書館
       */
      name?: string;
      /**
       * @description Website URL
       * @example http://www.lib.nctu.edu.tw/
       */
      url?: string;
    };
    WebsiteSearchResult: {
      result: components["schemas"]["SearchResultEntry"][];
      pagination: components["schemas"]["Pagination"];
    };
    SearchResultEntry: components["schemas"]["Affiliation"] & {
      /**
       * @description Composite ID made of campus, department, and office
       * @example campus-id$department-id$office-id
       */
      id: string;
      websites: components["schemas"]["SearchResultWebsiteEntry"][];
    };
    SearchResultWebsiteEntry: {
      /** @description Website ID */
      id: string;
      /**
       * @description Website name
       * @example 交通大學圖書館
       */
      name: string;
      /**
       * @description Website URL
       * @example http://www.lib.nctu.edu.tw/
       */
      url: string;
    };
    Pagination: {
      /** @description Cursor for next page */
      next_cursor: string | null;
      /** @description Number of websites returned in this page */
      num_results: number;
      /** @description Total number of websites */
      total_results: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
};

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
