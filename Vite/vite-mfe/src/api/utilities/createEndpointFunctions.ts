import { EndpointTypes } from "../endpoints";
import { useCustomQuery } from "./useCustomQuery";

export const createEndpointFunctions = (
  baseUrl: string,
  endpoints: EndpointTypes
) => {
  return Object.fromEntries(
    (Object.keys(endpoints) as (keyof EndpointTypes)[]).map((key) => {
      const useDynamicQuery = (
        params?: Parameters<typeof useCustomQuery>[0]["params"],
        options?: Parameters<typeof useCustomQuery>[0]["queryClientOptions"]
      ) => {
        const endpoint = endpoints[key];
        return useCustomQuery({
          url: `${baseUrl}/${endpoint.url}`,
          method: endpoint.method,
          headers: endpoint.headers,
          params: { ...(endpoint.params || {}), ...(params || {}) },
          queryClientOptions: options,
        });
      };
      useDynamicQuery.queryConfig = { queryId: endpoints[key].url };
      return [key, useDynamicQuery];
    })
  );
};
