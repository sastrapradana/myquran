import { useNavigate } from "react-router-dom";
import useHandleChange from "../../hooks/useHandleChange";
import { signUp } from "../../db/auth";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { supabase } from "../../db/config";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(undefined);
  const [typePassword, setTypePassword] = useState("password");

  const navigate = useNavigate();
  const { data, handleChange } = useHandleChange({
    username: "",
    email: "",
    password: "",
  });

  const hanldeSubmit = async (e) => {
    setIsLoading(true);
    setMessages(undefined);
    e.preventDefault();

    const register = await signUp(data);

    if (register.status == false) {
      setMessages(register.error.message);
    } else {
      const { error } = await supabase
        .from("user")
        .insert({ username: data.username, email: data.email });

      if (error) {
        setMessages(error.message);
      } else {
        navigate("/login");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full h-[100vh] relative">
      <img
        src="/mesjid1.jpeg"
        alt="bg-mesjid"
        className="w-full h-full object-cover"
      />
      <div className="w-full h-full bg-[#2da3d1b4] absolute top-0 left-0 center-row ">
        <div className="w-[90%] h-[80%] ">
          <div className="w-full h-max text-center">
            <h1 className="font-bold text-[1.5rem]">Myquran</h1>
            <p className="text-red-500 text-[.9rem] font-bold">{messages}</p>
          </div>
          <form
            className="w-full h-max mt-4 p-3 rounded-lg"
            onSubmit={hanldeSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-400 text-white outline-none text-sm rounded-lg  focus:border-white block w-full p-2.5 "
                required=""
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-400 text-white outline-none text-sm rounded-lg  focus:border-white block w-full p-2.5 "
                placeholder="name@gmail.com"
                required=""
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type={typePassword}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-400 text-white outline-none text-sm rounded-lg  focus:border-white block w-full p-2.5 "
                required=""
              />
              <div
                className=" absolute bottom-0.5 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setTypePassword(
                    typePassword == "password" ? "text" : "password"
                  )
                }
              >
                {typePassword == "password" ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </div>
            </div>

            {data.username == "" || data.email == "" || data.password == "" ? (
              <button
                className=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-[crimson] cursor-not-allowed"
                disabled
              >
                Daftar
              </button>
            ) : (
              <button
                type="submit"
                className="text-white tracking-[2px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 flex justify-center items-center"
              >
                {isLoading ? (
                  <ImSpinner3 size={25} className="animate-spin text-center" />
                ) : (
                  "Login"
                )}
              </button>
            )}
          </form>
          <div className="w-full h-max mt-2 center-row gap-2 text-[.9rem]">
            <p className="text-gray-200">Already have an account?</p>
            <button
              className="text-black px-3 py-1 rounded-md bg-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
