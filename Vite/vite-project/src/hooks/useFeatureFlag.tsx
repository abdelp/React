/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const queryConfig = {
  queryId: '/api/appconfig?app=:app',
}

export type UseGetFeatureFlagsResponse = {
  [key: string]: boolean
}

export function useGetFeatureFlags({
  app,
  options,
}: {
  app?: string
  options?: UseQueryOptions<
    UseGetFeatureFlagsResponse,
    AxiosError,
    UseGetFeatureFlagsResponse
  >
} = {}) {
  return useQuery(
    [queryConfig.queryId, app],
    async function fetchResult() {
      const res = await axios.get<UseGetFeatureFlagsResponse>(
        `https://jsonplaceholder.typicode.com/todos/1`,
      )

      return res?.data
    }

  )
}

useGetFeatureFlags.queryConfig = queryConfig;