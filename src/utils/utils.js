import Cookies from "js-cookie";
import { json } from "react-router-dom";

export function formatTime(time) {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

export const createCookies = (name, value) => {
  Cookies.set(name, value, { expires: 7 });
};

export const getCookies = (name) => {
  const dataString = Cookies.get(name);
  if (dataString) {
    const data = JSON.parse(dataString);
    return data;
  }

  return null;
};

export function cariWaktuAkanDatang(waktuSekarang, data) {
  const waktuObj = Object.keys(data[0]).filter((key) => key !== "tanggal");

  // Ambil jam dan menit dari waktu sekarang

  const [jamSekarang, menitSekarang] = waktuSekarang.split(":").map(Number);

  let waktuAkanDatang = null;
  let selisihWaktuTerdekat = Infinity;

  // Iterasi melalui waktu-waktu yang tersedia
  for (const waktu of waktuObj) {
    const [jam, menit] = data[0][waktu].split(":").map(Number);
    const selisihWaktu = jam * 60 + menit - (jamSekarang * 60 + menitSekarang);

    if (selisihWaktu >= 0 && selisihWaktu < selisihWaktuTerdekat) {
      waktuAkanDatang = waktu;
      selisihWaktuTerdekat = selisihWaktu;
    }
  }

  // console.log({ waktuAkanDatang });
  // console.log(data);

  if (waktuAkanDatang === null) {
    waktuAkanDatang = {
      waktu: waktuObj[1],
      jam: data[0][waktuObj[1]],
    };
  }

  return waktuAkanDatang;
}
