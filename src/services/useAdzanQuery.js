import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJadwalSholat, getKota } from "./useApi";
import { getCookiesName } from "../utils/utils";
import useRealTime from "../hooks/useRealTime";

export function useJadwalSholat(tahun, bulan) {
  let kota = "medan";
  const data = getCookiesName("kota");
  if (data) {
    kota = data;
  }

  return useQuery({
    queryKey: ["jadwalSholat"],
    queryFn: () => getJadwalSholat(kota, tahun, bulan),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGantiKota() {
  const [time] = useRealTime();
  const bulan = (time.getMonth() + 1).toString().padStart(2, "0");
  return useMutation({
    mutationFn: (kota) => {
      return getJadwalSholat(kota, "2023", bulan);
    },
  });
}

export function useInvalidateQuery() {
  const query = useQueryClient();

  const invalidateAdzanQuery = async () => {
    await query.invalidateQueries(["jadwalSholat"]);
  };

  return { invalidateAdzanQuery };
}

export function useDaftarKota() {
  return useQuery({
    queryKey: ["data-kota"],
    queryFn: getKota,
    staleTime: 5 * 60 * 1000,
  });
}
