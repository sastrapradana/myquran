import { useNavigate } from "react-router-dom";
import "./App.css";
import NavHome from "./components/nav-home";
import useRealTime from "./hooks/useRealTime";
import {
  cariWaktuAkanDatang,
  formatDate,
  formatTime,
  getCookies,
} from "./utils/utils";
import { useEffect, useState } from "react";
import { useJadwalSholat } from "./services/useAdzanQuery";

export default function App() {
  const [waktuSholat, setWaktuSholat] = useState(undefined);
  const navigate = useNavigate();

  const surahDibaca = getCookies("surah-dibaca");

  const [time] = useRealTime();
  const date = formatDate(time);
  const bulan = (time.getMonth() + 1).toString().padStart(2, "0");
  const tanggal = time.getDate().toString().padStart(2, "0");

  const { data: jadwalSholat } = useJadwalSholat("lubukpakam", "2023", bulan);

  const getJadwalSholatHariIni = (waktu) => {
    const filterData = jadwalSholat.filter((obj) => obj.tanggal == waktu);

    const waktuSekarang = formatTime(time);

    if (filterData.length === 0) {
      return;
    }

    const waktuAkanDatang = cariWaktuAkanDatang(waktuSekarang, filterData);
    setWaktuSholat(waktuAkanDatang);
  };

  const handleNavigate = () => {
    if (surahDibaca) {
      navigate(`/detail-surah/${surahDibaca.nomor}`);
    } else {
      navigate(`/detail-surah/1`);
    }
  };

  useEffect(() => {
    if (jadwalSholat) {
      getJadwalSholatHariIni(`2023-${bulan}-${tanggal}`);
    }
  }, [jadwalSholat, time]);

  return (
    <div className="w-full min-h-[100vh] max-h-max relative">
      <NavHome />

      <div className="w-[100%] h-max relative">
        <div className="w-full h-[300px] mx-auto flex justify-center items-center">
          <img
            src="/mesjid2.jpeg"
            alt="img_profil"
            loading="lazy"
            className="w-full h-[300px]  object-cover"
          />
          <div className="w-full h-[300px] right-0 absolute top-0 left-0 flex justify-center items-center text-white">
            <div className="w-[90%] h-full pt-[100px] flex flex-col items-center">
              <div className="w-max h-max text-center">
                {jadwalSholat ? (
                  jadwalSholat.tanggal == formatTime(time) ? (
                    <h1 className="font-bold text-[2.3rem] text-yellow-500 animate-pulse tracking-[2px] -mb-2">
                      {formatTime(time)}
                    </h1>
                  ) : (
                    <h1 className="font-bold text-[2.3rem] tracking-[2px] -mb-2">
                      {formatTime(time)}
                    </h1>
                  )
                ) : null}
                <p className="text-[.9rem] font-semibold text-gray-200">
                  {date}
                </p>
              </div>
              <div className="w-full h-[100%] flex flex-col justify-end pb-3">
                <div className="w-max h-max">
                  <p className="text-[.8rem] text-gray-300 font-semibold">
                    {jadwalSholat &&
                      (jadwalSholat.tanggal == formatTime(time)
                        ? "Waktu sholat yang sedang berlangsung"
                        : "Waktu sholat yang akan datang")}
                  </p>
                </div>
                <div className="w-full h-max flex justify-between items-center">
                  {waktuSholat ? (
                    <h1 className="text-[1.3rem] capitalize  text-yellow-500  font-bold">
                      {waktuSholat.waktu},
                      <span className="text-white font-medium text-[1.1rem]">
                        {waktuSholat.jam}
                      </span>
                    </h1>
                  ) : (
                    <span className="h-[20px] rounded-xl w-[100px] border animate-pulse bg-gray-300"></span>
                  )}
                  <p className="capitalize text-gray-300">medan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] h-max mx-auto  mt-6 mb-6">
          <div
            className="w-full h-[120px] rounded-3xl  bg1  flex justify-between items-center p-3 border cursor-pointer"
            onClick={handleNavigate}
          >
            <div className="w-max h-max flex flex-col">
              <h1 className="font-semibold text-white">
                {surahDibaca ? surahDibaca.namaLatin : "Al-Fatihah"}
              </h1>
              <p className="text-[.8rem] text-zinc-400 font-semibold">
                {surahDibaca ? surahDibaca.nama : "الفاتحة"} |{" "}
                {surahDibaca ? surahDibaca.jumlahAyat : "7"}
              </p>
              <p className="text-[.8rem] text-white">
                {surahDibaca ? "Terakhir dibaca" : "Mulai membaca"}
              </p>
            </div>
            <div className="w-max h-max">
              <img
                src="/icons.png"
                alt="icons"
                loading="lazy"
                className="w-[70px] h-[70px] object-cover"
              />
            </div>
          </div>
          <div className="w-full h-max mt-6">
            <div className="w-full h-max flex justify-between ">
              <div
                className="w-[45%] h-[170px] border rounded-3xl bg-[#0080804b] flex flex-col justify-center gap-3 p-3"
                onClick={() => navigate("/surah/1")}
              >
                <img
                  src="/alquran.png"
                  alt="alquran"
                  loading="lazy"
                  className="w-[50px] h-[70px] object-cover"
                />
                <div className="w-max h-max">
                  <h1 className="font-semibold text-white text-[1.2rem]">
                    Surah
                  </h1>
                  <p className="text-gray-200 text-[.8rem] -mt-1">
                    lihat semua
                  </p>
                </div>
              </div>
              <div
                className="w-[45%] h-[150px] border rounded-3xl bg-[#da19832a] flex flex-col justify-center gap-3 p-3"
                onClick={() => navigate("/doa/1")}
              >
                <img
                  src="/berdoa.png"
                  alt="alquran"
                  loading="lazy"
                  className="w-[50px] h-[70px] object-cover"
                />
                <div className="w-max h-max">
                  <h1 className="font-semibold text-white text-[1.2rem]">
                    Doa
                  </h1>
                  <p className="text-gray-200 text-[.8rem] -mt-1">
                    lihat semua
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-max -mt-2 flex justify-between items-end  ">
              <div
                className="w-[45%] h-[150px] border rounded-3xl bg-[#d81b1b2d]  flex flex-col justify-center gap-3 p-3"
                onClick={() => navigate("/waktu-sholat")}
              >
                <img
                  src="/sholat.png"
                  alt="alquran"
                  loading="lazy"
                  className="w-[70px] h-[70px] object-cover"
                />
                <div className="w-max h-max">
                  <h1 className="font-semibold text-white text-[1rem]">
                    Jadwal Sholat
                  </h1>
                  <p className="text-gray-200 text-[.8rem] -mt-1">
                    lihat semua
                  </p>
                </div>
              </div>
              <div className="w-[45%] h-[170px] border rounded-3xl bg-[#1353b43b] flex flex-col justify-center gap-3 p-3">
                <img
                  src="/bookmark.png"
                  alt="alquran"
                  loading="lazy"
                  className="w-[70px] h-[70px] object-cover"
                />
                <div className="w-max h-max">
                  <h1 className="font-semibold text-white text-[1rem]">
                    Bookmark
                  </h1>
                  <p className="text-gray-200 text-[.8rem] -mt-1">
                    lihat semua
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
