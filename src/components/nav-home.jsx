import { useNavigate } from "react-router-dom";
import { deleteAllCookies, getCookies } from "../utils/utils";
import { supabase } from "../db/config";

export default function NavHome() {
  const user = getCookies("user");
  const navigate = useNavigate();

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
      <>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Dropdown button{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {/* Dropdown menu */}
        <div
          id="dropdown"
          className="z-[10000000] hidden  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </>
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
        {/* <MenuDropdown /> */}
        <button className="w-max h-max">
          <img
            src="/berdoa.png"
            alt="img_profil"
            loading="lazy"
            className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white"
            onClick={handleSignOut}
          />
        </button>
      </div>
    </div>
  );
}
