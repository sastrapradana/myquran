/* eslint-disable react/prop-types */
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function NavLink({ title }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[80px]  fixed top-0 left-0 z-[100] bg-[rgba(241, 238, 238, 1)] backdrop-blur-lg">
      <div className="w-[90%] h-full mx-auto flex justify-between items-center">
        <div className="w-maxh-max" onClick={() => navigate("/home")}>
          <GoHome size={25} fill="white" />
        </div>
        <div className="w-full h-max text-center ">
          <h1 className="font-bold text-[1.1rem]">{title}</h1>
        </div>
      </div>
    </div>
  );
}
