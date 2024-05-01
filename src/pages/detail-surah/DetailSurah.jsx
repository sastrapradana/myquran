/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import NavDetailSurah from "../../components/nav-detailSurah";
import { FaPlay, FaPause } from "react-icons/fa";
import { getAllSurahByNomor } from "../../services/useApi";
import { useEffect, useState } from "react";

export default function DetailSurah() {
  const [data, setData] = useState(null);
  const { nomor } = useParams();

  const getDetailSurah = async () => {
    if (!nomor) return;
    const res = await getAllSurahByNomor(nomor);
    if (res.code == 200) {
      setData(res.data);
    }
  };
  console.log({ data });

  useEffect(() => {
    getDetailSurah();
  }, [nomor]);

  return (
    <div className="w-full min-h-[100vh] max-h-max">
      <NavDetailSurah namaSurah={data && data.nama} />
      {data ? (
        <div className="w-full h-max pt-[100px]">
          <div className="w-[90%] h-[180px] m-auto ring-1 ring-slate-400 shadow-xl shadow-[#ffffff3d] rounded-2xl relative">
            <img
              src="/bg-detail-surah1.jpeg"
              alt="icons"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center gap-1">
              <p className="border rounded-full w-[40px] h-[40px] flex justify-center items-center">
                {data.nomor}
              </p>
              <h1 className="text-yellow-500 font-semibold text-[1.2rem]">
                {data.namaLatin}
              </h1>
              <p className="-mt-2 text-[.8rem] text-gray-300 ">{data.arti}</p>
              <p className="text-[.9rem] font-semibold">
                {data.tempatTurun}, {data.jumlahAyat} ayat
              </p>
            </div>
          </div>
          <div className="w-[90%] h-max m-auto mt-6 flex flex-col items-center">
            <div className="w-full h-max flex justify-center items-center">
              <img
                src="/bismillah.png"
                alt="bismillah"
                className="w-full h-[100px] object-cover"
              />
            </div>
            <div className="w-full h-max mt-6 flex flex-col items-center justify-center gap-10">
              {data.ayat.map((item, i) => (
                <div className="w-full h-max flex flex-col gap-2 " key={i}>
                  <div className="w-full h-max flex justify-between items-center  rounded-lg p-1 bg-[#ffffff31]">
                    <p className="w-[30px] h-[30px] border border-dashed rounded-full text-white bg-yellow-500 flex justify-center items-center">
                      {item.nomorAyat}
                    </p>
                    <FaPlay size={20} fill="white" />
                  </div>
                  <div className="w-full h-max flex justify-end items-end flex-wrap flex-col">
                    <h1 className="text-[1.5rem] text-yellow-500 font-semibold">
                      {item.teksArab}
                    </h1>
                    <p className="text-[.8rem] italic text-gray-300">
                      {item.teksLatin}
                    </p>
                  </div>
                  <div className="w-full h-max">
                    <p className="text-[.9rem]">{item.teksIndonesia}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
