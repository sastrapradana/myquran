/* eslint-disable react/prop-types */
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { getCookies } from "../utils/utils";
import { deleteItemsQuery, getItemsQuery, insertItemsQuery } from "../db/query";
import { useEffect, useState } from "react";
export default function NavDetailSurah({ namaSurah, nomorSurah, nomorPage }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = getCookies("user");

  const getBookmark = async () => {
    const dataBookmark = await getItemsQuery("bookmark", "user_id", user.id);
    if (dataBookmark) {
      setData(dataBookmark);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await getItemsQuery("bookmark", "nomor_surah", nomorSurah);

      if (res.length > 0) {
        const deleteSurah = await deleteItemsQuery(
          "bookmark",
          "nomor_surah",
          nomorSurah
        );

        getBookmark();

        console.log({ deleteSurah });
      } else {
        const insertData = await insertItemsQuery("bookmark", {
          nama_surah: namaSurah,
          nomor_surah: nomorSurah,
          user_id: user.id,
        });
        getBookmark();

        console.log({ insertData });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <div className="w-full h-[80px]  fixed top-0 left-0 z-[100] bg-[rgba(241, 238, 238, 1)] backdrop-blur-lg">
      <div className="w-[90%] h-full mx-auto flex justify-between items-center">
        <div
          className="w-maxh-max"
          onClick={() => navigate(`/surah/${nomorPage}`)}
        >
          <MdKeyboardArrowLeft size={25} fill="white" />
        </div>
        <div className="w-max h-max text-center">
          {namaSurah ? (
            <h1 className="font-bold text-[1.3rem]">{namaSurah}</h1>
          ) : (
            <div className="w-[100px] h-[20px] rounded-xl m-auto bg-white animate-pulse"></div>
          )}
        </div>
        {data &&
          (data.some((item) => item.nomor_surah === nomorSurah) ? (
            <BsBookmarkHeartFill
              size={25}
              fill="orange"
              onClick={handleBookmark}
            />
          ) : (
            <BsBookmarkHeart size={25} fill="white" onClick={handleBookmark} />
          ))}
      </div>
    </div>
  );
}
