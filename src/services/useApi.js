const BASE_URL = "https://equran.id/api/v2";

export const getAllSurahApi = async () => {
  try {
    const res = await fetch(`${BASE_URL}/surat`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSurahByNomor = async (nomor) => {
  try {
    const res = await fetch(`${BASE_URL}/surat/${nomor}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
