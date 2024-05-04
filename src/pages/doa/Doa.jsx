import { useEffect, useState } from "react";
import NavLink from "../../components/navLink";
import { FiSearch } from "react-icons/fi";
import { useDataDoa } from "../../services/useDoaQuery";
// import { getAllDoa } from "../../services/useApi";

export default function Doa() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const { data: dataDoa, isPending } = useDataDoa();

  console.log({ dataDoa, isPending });

  const getDoa = () => {
    if (!isPending) {
      const sliceData = dataDoa.slice(0, 10);
      setData(sliceData);
    }
  };

  const SkeletonCard = () => {
    return (
      <div
        role="status"
        className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  useEffect(() => {
    getDoa();
  }, [dataDoa]);

  return (
    <div className="w-full min-h-[100vh] max-h-max">
      <NavLink title="Doa" />
      <div className="w-full h-max pt-[100px]">
        <div className="w-[90%] h-max mx-auto relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-[.9rem] h-[45px] px-4 rounded-3xl border outline-none focus:border-2 focus:border-gray-400 bg-transparent text-white"
            placeholder="Cari"
          />
          <FiSearch
            size={20}
            className="absolute right-4 top-3 text-gray-300"
          />
        </div>
      </div>
      <div className="w-full h-max mt-6 mb-6">
        <div className="w-[90%] h-max mx-auto flex flex-col items-center justify-between  gap-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                className="w-full min-h-[50px] max-h-max rounded-2xl bg-[#2be6794f] shadow-xl flex items-center gap-5 p-3"
                key={index}
              >
                <div className="w-max h-full">
                  <p className="text-[1] text-yellow-500 font-medium">
                    {item.id}.
                  </p>
                </div>
                <div className="w-max h-full ">
                  <p className=" font-semibold">{item.judul}</p>
                </div>
              </div>
            ))
          ) : (
            <SkeletonCard />
          )}
        </div>
      </div>
    </div>
  );
}
