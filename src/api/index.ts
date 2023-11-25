import createClient from "openapi-fetch";
import { paths } from "./types";

const BASE_URL = "http://localhost:8080";

export const apiClient = createClient<paths>({
  baseUrl: BASE_URL,
});
