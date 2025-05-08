import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export interface CustomQueryOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  queryClientOptions?: UseQueryOptions;
  params?: Record<string, unknown>;
  headers?: Record<string, string | undefined>;
}

const useCustomQuery = (options: CustomQueryOptions) => {
  const customQuery = useQuery({
    queryKey: [options.url, { ...options.params }],
    queryFn: async function fetchResult() {
      const res = await axios[options.method](options.url, {
        params: options.params,
        headers: options.headers,
      });

      return res?.data;
    },

    staleTime: 1000 * 60 * 1, // 1 minute
    enabled: options?.queryClientOptions?.enabled ?? true,
    ...options.queryClientOptions,
  });

  return customQuery;
};

export { useCustomQuery };
