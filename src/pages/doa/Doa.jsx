import { useEffect, useState } from "react";
import NavLink from "../../components/navLink";
import { FiSearch } from "react-icons/fi";
import { useDataDoa } from "../../services/useDoaQuery";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";
import SkeletonDoa from "../../components/skeleton-doa";
import { useDebounce } from "use-debounce";

import CardDoa from "../../components/card-doa";
export default function Doa() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [debouncedValue] = useDebounce(search, 2000);

  const { data: dataDoa, isPending } = useDataDoa();
  const handlePageChange = (page) => {
    if (dataDoa) {
      const sliceData = dataDoa.slice((page - 1) * 10, page * 10);
      setData(sliceData);
    }
  };

  const handleSearchDoa = () => {
    if (search != "") {
      const filteredData = dataDoa.filter((item) => {
        return item.judul.toLowerCase().includes(search.toLowerCase());
      });

      if (filteredData.length === 0) {
        alert("Doa Anda Yang Dicari Tidak Ditemukan");
        return;
      }

      setData(filteredData);
    }
  };

  useEffect(() => {
    if (debouncedValue.length > 0) {
      handleSearchDoa();
    } else {
      handlePageChange(id);
    }
  }, [dataDoa, debouncedValue]);

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
            data.map((item, index) => <CardDoa key={index} items={item} />)
          ) : (
            <SkeletonDoa />
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
