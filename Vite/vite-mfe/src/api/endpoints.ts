import { createEndpointFunctions } from "./utilities/createEndpointFunctions";
import { CustomQueryOptions } from "./utilities/useCustomQuery";
export type Endpoint = CustomQueryOptions;

export interface EndpointTypes {
  getMovies: CustomQueryOptions;
}

const BASE_URL = "https://streaming-availability.p.rapidapi.com";

export const endpoints: EndpointTypes = Object.freeze({
  getMovies: {
    method: "get" as const,
    url: "countries",
    params: {
      output_language: "en",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    },
  },
});

export const endpointFunctions = createEndpointFunctions(BASE_URL, endpoints);
