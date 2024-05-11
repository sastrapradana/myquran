import { useEffect, useState } from "react";
import NavLink from "../../components/navLink";
import { useNavigate } from "react-router-dom";
import { getCookies } from "../../utils/utils";
import { getItemsQuery } from "../../db/query";

export default function Bookmark() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = getCookies("user");

  const getBookmark = async () => {
    const dataBookmark = await getItemsQuery("bookmark", "user_id", user.id);
    if (dataBookmark) {
      setData(dataBookmark);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <div className="w-full min-h-[100vh] max-h-max">
      <NavLink title="Bookmark" />
      <div className="w-full h-max pt-[100px]">
        <div className="w-[90%] h-max m-auto center-row gap-4 flex-wrap">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                className="w-[45%] h-[50px] rounded-xl bg-white text-black center-row shadow-xl cursor-pointer"
                key={index}
                onClick={() => navigate(`/detail-surah/${item.nomor_surah}`)}
              >
                <p>{item.nama_surah}</p>
              </div>
            ))
          ) : (
            <p className="italic font-semibold">Data Bookmark masih kosong</p>
          )}
        </div>
      </div>
    </div>
  );
}
