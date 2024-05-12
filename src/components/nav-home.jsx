import { useNavigate } from "react-router-dom";
import { deleteAllCookies, getCookies } from "../utils/utils";
import { supabase } from "../db/config";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
export default function NavHome() {
  const user = getCookies("user");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log({ error });
    } else {
      deleteAllCookies();
      navigate("/login");
    }
  };

  const MenuDropdown = () => {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center w-max h-max"
        >
          <img
            src="/berdoa.png"
            alt="img_profil"
            loading="lazy"
            className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white"
            // onClick={handleSignOut}
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-max bg-zinc-200 text-black rounded-md shadow-lg">
            <div className="w-max h-max ">
              <button
                className="px-4 py-2 text-sm text-black hover:bg-zinc-300 w-max h-max flex gap-1 items-center rounded-md"
                onClick={handleSignOut}
              >
                <IoLogOutOutline size={25} className="text-red-400" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-[80px] absolute top-0 left-0 z-50 ">
      <div className="w-[90%] h-full mx-auto flex justify-between items-center">
        <div className="w-full h-max text-white">
          <h1 className="font-bold text-[1.1rem]">Assalamu Alaikum!</h1>
          <h1 className="font-bold text-[.9rem] -mt-1 text-yellow-500">
            {user ? user.username : "myQuran"}
          </h1>
        </div>
        <MenuDropdown />
        {/* <button className="w-max h-max">
          <img
            src="/berdoa.png"
            alt="img_profil"
            loading="lazy"
            className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white"
            onClick={handleSignOut}
          />
        </button> */}
      </div>
    </div>
  );
}
