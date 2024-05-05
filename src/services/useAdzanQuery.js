import { useQuery } from "@tanstack/react-query";
import { getJadwalSholat } from "./useApi";

export function useJadwalSholat(kota, tahun, bulan) {
  return useQuery({
    queryKey: ["jadwalSholat"],
    queryFn: () => getJadwalSholat(kota, tahun, bulan),
    staleTime: 5 * 60 * 1000,
  });
}
