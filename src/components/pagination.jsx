import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Pagination({ totalItems, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    onPageChange(currentPage - 1);
    navigate(`/surah/${currentPage - 1}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    onPageChange(currentPage + 1);
    navigate(`/surah/${currentPage + 1}`);
  };

  return (
    <div className="flex m-auto mt-4 mb-6 w-max h-max items-center justify-center gap-4">
      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size={30} fill="white" />
      </button>
      <p>
        {currentPage} of {totalPages}
      </p>
      <button
        className="flex items-center justify-center px-3 h-8  text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size={30} fill="white" />
      </button>
    </div>
  );
}
