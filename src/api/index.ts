import createClient from "openapi-fetch";
import { paths } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = createClient<paths>({
  baseUrl: BASE_URL,
});
