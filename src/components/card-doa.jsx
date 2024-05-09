/* eslint-disable react/prop-types */

// import { useEffect, useState } from "react";
// import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export default function CardDoa({ items }) {
  return (
    <div className="w-full h-max border p-2 rounded-xl shadow-xl bg-[#2ed34a2d]">
      <div className="w-full h-max flex justify-between items-center">
        <p>
          {items.id}. {items.judul}
        </p>
      </div>
      <div className="w-full h-max flex items-end   flex-col mt-6">
        <h1 className="text-[1.5rem] text-yellow-500 font-semibold text-end">
          {items.arab}
        </h1>
        <p className="text-[.8rem] italic text-gray-300 text-end">
          {items.latin}
        </p>
      </div>
      <div className="w-full h-max mt-4">
        <p className="text-[.9rem] italic">&quot;{items.terjemah}.&quot;</p>
      </div>
    </div>
  );
}
