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

  return (
    <div className="w-full h-[80px] absolute top-0 left-0 z-50 ">
      <div className="w-[90%] h-full mx-auto flex justify-between items-center">
        <div className="w-full h-max text-white">
          <h1 className="font-bold text-[1.1rem]">Assalamu Alaikum!</h1>
          <h1 className="font-bold text-[.9rem] -mt-1 text-yellow-500">
            {user ? user.username : "myQuran"}
          </h1>
        </div>
        <img
          src="/berdoa.png"
          alt="img_profil"
          loading="lazy"
          className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white"
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
}
