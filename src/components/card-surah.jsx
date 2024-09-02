/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createCookies, getCookies } from "../utils/utils";
import AudioPlayer from "./audio-player";
import { FiHeart } from "react-icons/fi";

const CardSurah = ({
  ayatRefs,
  index,
  qory,
  keyQory,
  nomorAyat,
  nomorSurah,
  audio,
  teksArab,
  teksLatin,
  teksIndonesia,
}) => {
  const [data, setData] = useState({ nomorSurah: 0, nomorAyat: 0 });
  const handleLove = () => {
    const data = {
      nomorSurah,
      nomorAyat,
    };
    createCookies("surah-ditandai", JSON.stringify(data));
    setData(data);
  };

  const getCookiesSurahDitandai = getCookies("surah-ditandai");

  useEffect(() => {
    if (getCookiesSurahDitandai) {
      const { nomorSurah, nomorAyat } = getCookiesSurahDitandai;
      setData({ nomorSurah, nomorAyat });
    }
  }, []);

  return (
    <div
      className="w-full h-max flex flex-col gap-2 "
      ref={(el) => (ayatRefs.current[index] = el)}
    >
      <div className="w-full h-max flex justify-between items-center rounded-lg p-1 bg-[#ffffff31]">
        <p className="w-[30px] h-[30px] border border-dashed rounded-full text-white bg-yellow-500 flex justify-center items-center">
          {nomorAyat}
        </p>
        <div className="w-max flex items-center gap-4">
          <button className="cursor-pointer" onClick={handleLove}>
            <FiHeart
              size={23}
              color={
                nomorSurah == data.nomorSurah && nomorAyat == data.nomorAyat
                  ? "crimson"
                  : "white"
              }
              fill={
                nomorSurah == data.nomorSurah && nomorAyat == data.nomorAyat
                  ? "crimson"
                  : "white"
              }
            />
          </button>
          {qory !== "" && keyQory && <AudioPlayer audioSrc={audio[keyQory]} />}
        </div>
      </div>
      <div className="w-full h-max flex flex-col">
        <h1 className="text-[2rem] text-yellow-500 font-semibold text-end">
          {teksArab}
        </h1>
        <p className="text-[.8rem] italic text-gray-300 mt-1">{teksLatin}</p>
      </div>
      <div className="w-full h-max">
        <p className="text-[.9rem]">{teksIndonesia}</p>
      </div>
    </div>
  );
};

export default CardSurah;
