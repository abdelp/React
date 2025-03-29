import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL =
  "https://streaming-availability.p.rapidapi.com/countries?output_language=en";

export const useGetMovies = () => {
  console.log(process.env.RAPIDAPI_KEY);
  console.log(process.env.RAPIDAPI_HOST);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await axios.get(BASE_URL, {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      });
      return response.data;
    },
    placeholderData: { ar: { countryCode: "ar", name: "Argentina" } },
  });

  return { data, isLoading, isError };
};
