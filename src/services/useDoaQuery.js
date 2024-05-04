import { useQuery } from "@tanstack/react-query";
import { getAllDoa } from "./useApi";

export function useDataDoa() {
  return useQuery({
    queryKey: ["dataDoa"],
    queryFn: getAllDoa,
    staleTime: 5 * 60 * 1000,
  });
}
