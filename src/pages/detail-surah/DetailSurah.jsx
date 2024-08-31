/* eslint-disable react/no-unescaped-entities */
import { useNavigate, useParams } from "react-router-dom";
import NavDetailSurah from "../../components/nav-detailSurah";
import { getAllSurahByNomor } from "../../services/useApi";
import { useEffect, useRef, useState } from "react";
import { getCookies } from "../../utils/utils";
import CardSurah from "../../components/card-surah";
import { useLocation } from "react-router-dom";
import { CiDesktopMouse2, CiSearch } from "react-icons/ci";
export default function DetailSurah() {
  const [qory, setQory] = useState("");
  const [keyQory, setKeyQory] = useState("");
  const [urlFull, setUrlFull] = useState("");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const { nomor } = useParams();

  const navigate = useNavigate();
  const [test, setTest] = useState(false);
  const page = getCookies("nomor");
  const ayatRefs = useRef([]);
  const { pathname } = useLocation();
  const getDetailSurah = async () => {
    if (!nomor) return;
    const res = await getAllSurahByNomor(nomor);
    if (res.code == 200) {
      setData(res.data);
      setTest(true);
    }
  };

  useEffect(() => {
    getDetailSurah();
    const searchParams = new URLSearchParams(location.search);
    const ayatIndex = parseInt(searchParams.get("ayat"));

    if (ayatIndex && ayatRefs.current[ayatIndex - 1]) {
      ayatRefs.current[ayatIndex - 1].scrollIntoView({ behavior: "smooth" });
    }
  }, [nomor, location.search, test]);

  const SkeletonHeader = () => {
    return (
      <div className="w-[90%] h-[180px] m-auto ring-1 ring-slate-400 shadow-xl shadow-[#ffffff3d] rounded-2xl relative ">
        <div className="w-full h-full animate-pulse absolute top-0 left-0 flex flex-col justify-center items-center gap-1">
          <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
          <div className="w-[40px] h-[40px] bg-gray-300 rounded-full flex justify-center items-center"></div>
          <div className="w-[80%] h-[1.2rem] bg-gray-300 rounded-md"></div>
          <div className="w-[60%] h-[.8rem] bg-gray-300 rounded-md"></div>
          <div className="w-[50%] h-[.9rem] bg-gray-300 rounded-md"></div>
        </div>
      </div>
    );
  };

  const SkeletonSurah = () => {
    return (
      <div className="w-full h-max flex flex-col gap-2">
        <div className="w-full h-max flex justify-between items-center rounded-lg p-1 bg-[#ffffff31] animate-pulse">
          <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
          <div className="w-[20px] h-[20px] bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-full h-max flex justify-end items-end flex-wrap flex-col">
          <div className="w-[150px] h-[24px] bg-gray-300 rounded-md"></div>
          <div className="w-[100px] h-[16px] bg-gray-300 rounded-md mt-1"></div>
        </div>
        <div className="w-full h-max">
          <div className="w-full h-[1rem] bg-gray-300 rounded-md"></div>
          <div className="w-full h-[1rem] bg-gray-300 rounded-md mt-1"></div>
          <div className="w-full h-[1rem] bg-gray-300 rounded-md mt-1"></div>
          <div className="w-[80%] h-[1rem] bg-gray-300 rounded-md mt-1"></div>
        </div>
      </div>
    );
  };

  const handleChange = (event) => {
    const { value: ulama } = event.target;
    setQory(ulama);
    // eslint-disable-next-line no-unused-vars
    const [key, value] = Object.entries(data.audioFull).find(([key, url]) =>
      url.includes(ulama)
    );
    setUrlFull(value);
    setKeyQory(key);
  };

  const handleSearch = () => {
    if (search === "") return;
    if (search > data.ayat.length)
      return alert(`Ayat cuman ${data.ayat.length}`);
    navigate(`${pathname}?ayat=${search}`);
  };

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-[100vh] max-h-max">
      <button
        className="w-max h-max p-2 rounded-xl bg-pink-600 fixed bottom-[20px] right-[20px]"
        onClick={handleTop}
        title="Scroll To Top"
      >
        <CiDesktopMouse2 size={30} color="white" />
      </button>
      <div className="w-full h-max pt-[120px] flex justify-center items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[70%] h-max rounded-xl px-3 py-2 text-black"
          placeholder="Cari Ayat"
        />
        <button
          className="p-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600"
          type="submit"
          onClick={handleSearch}
        >
          <CiSearch size={20} color="white" />
        </button>
      </div>
      <NavDetailSurah
        namaSurah={data && data.namaLatin}
        nomorPage={page}
        nomorSurah={data && data.nomor}
      />
      {data ? (
        <div className="w-full h-max pt-[50px]">
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
              <h1 className="text-yellow-500 font-semibold text-[1.4rem]">
                {data.nama}
              </h1>
              <p className="-mt-2 text-[.8rem] text-gray-300 ">{data.arti}</p>
              <p className="text-[.9rem] font-semibold">
                {data.tempatTurun}, {data.jumlahAyat} ayat
              </p>
            </div>
          </div>
          <div className="w-[90%] h-max m-auto mt-6 flex flex-col items-center">
            <div className="w-full h-max flex items-center flex-col gap-3">
              <div className="w-full h-[50px] rounded-xl">
                <select
                  id="small"
                  className="block w-full h-full p-2 mb-6 text-sm bg-black outline-none text-yellow-500 rounded-lg border font-semibold"
                  onChange={handleChange}
                >
                  <option disabled value={"null"}>
                    Pilih Qory
                  </option>
                  <option value={"Abdullah-Al-Juhany"}>
                    Abdullah-Al-Juhany
                  </option>
                  <option value={"Abdul-Muhsin-Al-Qasim"}>
                    Abdul-Muhsin-Al-Qasim
                  </option>
                  <option value={"Abdurrahman-as-Sudais"}>
                    Abdurrahman-as-Sudais
                  </option>
                  <option value={"Ibrahim-Al-Dossari"}>
                    Ibrahim-Al-Dossari
                  </option>
                  <option value={"Misyari-Rasyid-Al-Afasi"}>
                    Misyari-Rasyid-Al-Afasi
                  </option>
                </select>
              </div>
              {qory == "" ? (
                <audio controls disabled />
              ) : (
                <div
                  className={`w-full h-[50px] flex items-center justify-center rounded-xl `}
                >
                  <audio src={urlFull} controls preload="auto" />
                </div>
              )}
            </div>
            <div className="w-full h-max flex justify-center items-center mt-2">
              <img
                src="/bismillah.png"
                alt="bismillah"
                className="w-full h-[100px] object-cover"
              />
            </div>
            <div className="w-full h-max mt-6 flex flex-col items-center justify-center gap-10">
              {data.ayat.map((item, i) => (
                <CardSurah
                  key={i}
                  ayatRefs={ayatRefs}
                  index={i}
                  qory={qory}
                  keyQory={keyQory}
                  nomorAyat={item.nomorAyat}
                  audio={item.audio}
                  teksArab={item.teksArab}
                  teksLatin={item.teksLatin}
                  teksIndonesia={item.teksIndonesia}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-max pt-[100px]">
          <SkeletonHeader />
          <div className="w-[90%] h-max m-auto mt-6 flex flex-col items-center">
            <div className="w-full h-max mt-6 flex flex-col items-center justify-center gap-10">
              <SkeletonSurah />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
