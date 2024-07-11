import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex bg-[#7777e4] text-center justify-between p-2">
      <h1 className="text-white font-serif font-bold">ChatMe</h1>
      <div className="flex items-center +  ">
        <img
          src={currentUser.photoURL}
          alt="user"
          className="w-6 h-6 rounded-full mr-2"
        />
        <p className="mr-2 font-serif font-bold text-white">
          {currentUser.displayName}
        </p>
        <button
          className="bg-white text-[#7777e4] px-2 py-1 rounded hover:bg-red-700 hover:text-white sm:hidden md:block"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
