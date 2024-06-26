import { useQuery } from "@tanstack/react-query";
import { getAllSurahApi } from "./useApi";

export function useDataSurah() {
  return useQuery({
    queryKey: ["dataSurah"],
    queryFn: getAllSurahApi,
    staleTime: 5 * 60 * 1000,
  });
}

// export function useSurahBookmark() {
//   return useQuery({
//     queryKey: ["bookmark"],
//     queryFn: getAllSurahApi,
//     staleTime: 5 * 60 * 1000,
//   });
// }
