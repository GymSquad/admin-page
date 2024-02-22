import {
  QueryKey,
  UseQueryOptions as ReactQueryOptions,
} from "@tanstack/react-query";

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  ReactQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryFn" | "queryKey"
>;
