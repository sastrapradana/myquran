/* eslint-disable react/prop-types */
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function NavDetailSurah({ namaSurah }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[80px]  fixed top-0 left-0 z-[100] bg-[rgba(241, 238, 238, 1)] backdrop-blur-lg">
      <div className="w-[90%] h-full mx-auto flex justify-between items-center">
        <div className="w-maxh-max" onClick={() => navigate("/surah")}>
          <MdKeyboardArrowLeft size={25} fill="white" />
        </div>
        <div className="w-full h-max text-center ">
          <h1 className="font-bold text-[1.5rem]">{namaSurah}</h1>
        </div>
      </div>
    </div>
  );
}
