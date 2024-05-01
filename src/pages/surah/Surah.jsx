import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getAllSurahApi } from "../../services/useApi";
import NavSurah from "../../components/nav-surah";
import { useNavigate } from "react-router-dom";
export default function Surah() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const Skeleton = () => {
    return (
      <div className="w-full h-max py-3 shadow-md bg-[#ffffff2c] rounded-2xl backdrop-blur-lg  flex justify-between items-center">
        <div className="w-max h-max flex items-center gap-4">
          <div className="w-[50px] h-[50px] bg-zinc-100 animate-pulse rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-[120px] h-4 bg-zinc-100 animate-pulse"></div>
            <div className="w-[80px] h-3 bg-zinc-100 animate-pulse"></div>
          </div>
        </div>
        <div className="w-max h-max">
          <div className="w-[60px] h-6 bg-zinc-100 animate-pulse"></div>
        </div>
      </div>
    );
  };

  const getSurah = async () => {
    const res = await getAllSurahApi();
    if (res.code == 200) {
      const sliceData = res.data.slice(0, 10);
      setData(sliceData);
    }
  };

  useEffect(() => {
    getSurah();
  }, []);

  console.log({ data });

  return (
    <div className="w-full min-h-[100vh] max-h-max">
      <NavSurah />
      <div className="w-full h-max pt-[100px]">
        <div className="w-[90%] h-max mx-auto relative">
          <input
            type="text"
            className="w-full text-[.9rem] h-[45px] px-4 rounded-3xl border outline-none focus:border-2 focus:border-black"
            placeholder="Cari"
          />
          <FiSearch
            size={20}
            className="absolute right-4 top-3 text-gray-300"
          />
        </div>
      </div>

      {/* card */}
      <div className="w-full h-max mt-6">
        <div className="w-[90%] h-max mx-auto flex flex-col items-center gap-5">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                className="w-full h-max p-3 shadow-md bg-[#ffffff63] rounded-2xl backdrop-blur-lg flex justify-between items-center"
                key={index}
                onClick={() => navigate(`/surah/${item.nomor}`)}
              >
                <div className="w-max h-max flex items-center gap-4">
                  <div className="w-[50px] relative h-[50px] border flex justify-center items-center rounded-full">
                    <img
                      src="/border_nomor.png"
                      alt="icons nomor"
                      className="w-[50px] h-[50px] object-cover"
                    />
                    <p className="absolute font-semibold text-black">
                      {item.nomor}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-semibold">{item.namaLatin}</h1>
                    <p className="text-[.7rem]  text-black font-semibold">
                      {item.arti} . {item.jumlahAyat} Ayat
                    </p>
                  </div>
                </div>
                <div className="w-max h-max">
                  <p className="font-semibold text-[1.2rem]">{item.nama}</p>
                </div>
              </div>
            ))
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
}
