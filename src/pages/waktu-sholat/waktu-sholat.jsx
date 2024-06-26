import NavLink from "../../components/navLink";
import useRealTime from "../../hooks/useRealTime";
import {
  useDaftarKota,
  useGantiKota,
  useInvalidateQuery,
  useJadwalSholat,
} from "../../services/useAdzanQuery";
import {
  createCookies,
  formatDate,
  formatTime,
  getCookiesName,
} from "../../utils/utils";
import { IoPartlySunnySharp, IoCloudyNight } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { PiSunHorizonFill } from "react-icons/pi";
import { useEffect, useState } from "react";

export default function WaktuSholat() {
  const [waktuSholat, setWaktuSholat] = useState(undefined);
  const [time] = useRealTime();
  const date = formatDate(time);
  const bulan = (time.getMonth() + 1).toString().padStart(2, "0");
  const tanggal = time.getDate().toString().padStart(2, "0");
  const kota = getCookiesName("kota");

  const { data: jadwalSholat } = useJadwalSholat("2023", bulan);
  const { mutate } = useGantiKota();
  const { data: dataKota } = useDaftarKota();
  const { invalidateAdzanQuery } = useInvalidateQuery();

  const getJadwalSholatHariIni = (waktu) => {
    const filterData = jadwalSholat.filter((obj) => obj.tanggal == waktu);
    if (filterData.length === 0) {
      return;
    }

    const objData = filterData[0];
    const pecahData = Object.entries(objData).filter(
      ([key]) =>
        key !== "tanggal" &&
        key !== "dhuha" &&
        key !== "imsyak" &&
        key !== "terbit"
    );

    const dataLast = pecahData.map(([key, value]) => {
      return { waktu: key, jam: value };
    });

    setWaktuSholat(dataLast);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    createCookies("kota", value);
    mutate(value, {
      onSuccess() {
        invalidateAdzanQuery();
      },
    });
  };

  useEffect(() => {
    if (jadwalSholat) {
      getJadwalSholatHariIni(`2023-${bulan}-${tanggal}`);
    }
  }, [jadwalSholat, time]);

  return (
    <div className="w-full min-h-[100vh] max-h-max">
      <NavLink title="Jadwal Sholat" />
      <div className="container pt-[100px]">
        <div className="w-[90%] m-auto rounded-xl relative h-[150px] border overflow-hidden">
          <img
            src="/bg-detail-surah2.jpeg"
            alt="bg-card"
            loading="lazy"
            className="w-full h-full object-cover rounded-xl "
          />
          <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 bg-[#0000001e]">
            <p className="text-yellow-500 font-semibold">{date}</p>
            <p className="text-[2rem] font-bold">{formatTime(time)}</p>
          </div>
        </div>
      </div>

      <div className="w-[90%] m-auto h-max mt-4">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Pilih Kota Anda
        </label>
        <select
          id="countries"
          // value={kota}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {kota ? (
            <option value={kota}>{kota}</option>
          ) : (
            <option value="medan">medan</option>
          )}
          {dataKota &&
            dataKota.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
        </select>
      </div>

      <div className="container mt-6 mb-4">
        <div className="w-[90%] h-max m-auto flex items-center justify-between flex-wrap gap-4">
          {waktuSholat ? (
            waktuSholat.map((item, i) => (
              <div
                className="w-[45%] h-max border bg-white text-black rounded-xl shadow-xl flex flex-col items-center p-3 gap-2  overflow-hidden"
                key={i}
              >
                <div className="w-max  h-max  center-row border border-sky-400 p-2 rounded-full bg-[#70cae03b]">
                  {item.waktu == "shubuh" ? (
                    <IoPartlySunnySharp size={40} className="text-yellow-400" />
                  ) : item.waktu == "dzuhur" ? (
                    <IoMdSunny size={40} className="text-yellow-300" />
                  ) : item.waktu == "ashr" ? (
                    <IoMdSunny size={40} className="text-orange-400" />
                  ) : item.waktu == "magrib" ? (
                    <PiSunHorizonFill size={40} className="text-orange-600" />
                  ) : (
                    <IoCloudyNight size={40} className="text-gray-500" />
                  )}
                </div>
                <div className="w-max h-full center-col">
                  <p className="font-bold text-[1.1rem] capitalize">
                    {item.waktu}
                  </p>
                  <p className="font-medium text-gray-500">{item.jam}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-[45%] h-[143px] border bg-gray-300 animate-pulse rounded-xl"></div>
          )}
        </div>
      </div>
    </div>
  );
}
