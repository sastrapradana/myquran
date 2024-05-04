import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  title,
}) {
  const { id } = useParams();

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    const prevPage = Math.max(id - 1, 1);
    onPageChange(prevPage);
    navigate(`/${title}/${prevPage}`);
  };

  const handleNextPage = () => {
    const nextPage = parseInt(id) + 1;
    onPageChange(nextPage);
    navigate(`/${title}/${nextPage}`);
  };

  return (
    <div className="flex m-auto mt-4 mb-6 w-max h-max items-center justify-center gap-4">
      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium  bg-gray-800 border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed "
        onClick={handlePrevPage}
        disabled={id == 1}
      >
        <MdKeyboardArrowLeft size={30} fill="white" />
      </button>
      <p>
        {id} of {totalPages}
      </p>
      <button
        className="flex items-center justify-center px-3 h-8  text-sm font-medium text-gray-800 bg-gray-800 border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed "
        onClick={handleNextPage}
        disabled={id == totalPages}
      >
        <MdKeyboardArrowRight size={30} fill="white" />
      </button>
    </div>
  );
}
