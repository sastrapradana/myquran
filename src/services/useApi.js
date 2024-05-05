const BASE_URL_QURAN = "https://equran.id/api/v2";
const BASE_URL_DOA = "https://open-api.my.id/api/doa";
const BASE_URL_ADZAN =
  "https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan";

export const getAllSurahApi = async () => {
  try {
    const res = await fetch(`${BASE_URL_QURAN}/surat`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSurahByNomor = async (nomor) => {
  try {
    const res = await fetch(`${BASE_URL_QURAN}/surat/${nomor}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDoa = async () => {
  try {
    const res = await fetch(`${BASE_URL_DOA}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDoaById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL_DOA}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getJadwalSholat = async (kota, tahun, bulan) => {
  try {
    const res = await fetch(`${BASE_URL_ADZAN}/${kota}/${tahun}/${bulan}.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error });
  }
};
