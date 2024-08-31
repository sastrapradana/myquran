/* eslint-disable react/prop-types */
import { TbFlag3Filled } from "react-icons/tb";
import AudioPlayer from "./audio-player";

const CardSurah = ({
  ayatRefs,
  index,
  qory,
  keyQory,
  nomorAyat,
  audio,
  teksArab,
  teksLatin,
  teksIndonesia,
}) => {
  return (
    <div
      className="w-full h-max flex flex-col gap-2 "
      ref={(el) => (ayatRefs.current[index] = el)}
    >
      <div className="w-full h-max flex justify-between items-center rounded-lg p-1 bg-[#ffffff31]">
        <p className="w-[30px] h-[30px] border border-dashed rounded-full text-white bg-yellow-500 flex justify-center items-center">
          {nomorAyat}
        </p>
        <div className="w-max flex items-center">
          <button className="cursor-pointer">
            <TbFlag3Filled size={25} fill="white" />
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
