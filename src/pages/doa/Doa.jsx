import { useEffect, useState } from "react";
import NavLink from "../../components/navLink";
import { FiSearch } from "react-icons/fi";
import { useDataDoa } from "../../services/useDoaQuery";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";
// import { getAllDoa } from "../../services/useApi";

export default function Doa() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();

  const { data: dataDoa, isPending } = useDataDoa();

  const SkeletonCard = () => {
    return (
      <div
        role="status"
        className="flex items-center justify-center h-56 w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
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

  const handlePageChange = (page) => {
    if (dataDoa) {
      const sliceData = dataDoa.slice((page - 1) * 10, page * 10);
      setData(sliceData);
    }
  };

  useEffect(() => {
    handlePageChange(id);
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
            placeholder="Cari doamu disini..."
          />
          <FiSearch
            size={20}
            className="absolute right-4 top-3 text-gray-300"
          />
        </div>
      </div>
      <div className="w-full h-max mt-6 mb-6">
        <div className="w-[90%] h-max mx-auto flex flex-col items-center justify-between  gap-5">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                className="w-full h-max border p-2 rounded-xl shadow-xl bg-[#2ed34a2d]"
                key={index}
              >
                <div className="w-full h-max">
                  <p>
                    {item.id}. {item.judul}
                  </p>
                </div>
                <div className="w-full h-max flex items-end   flex-col mt-6">
                  <h1 className="text-[1.5rem] text-yellow-500 font-semibold text-end">
                    {item.arab}
                  </h1>
                  <p className="text-[.8rem] italic text-gray-300 text-end">
                    {item.latin}
                  </p>
                </div>
                <div className="w-full h-max mt-4">
                  <p className="text-[.9rem] italic">
                    &quot;{item.terjemah}.&quot;
                  </p>
                </div>
              </div>
            ))
          ) : (
            <SkeletonCard />
          )}
        </div>
      </div>
      {!isPending && (
        <Pagination
          totalItems={dataDoa.length}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          title={"doa"}
        />
      )}
    </div>
  );
}
