import { useContext } from "react";
import { RespContext } from "../context/RespContext";
import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { Search } from "./Search";

export const SideBar = () => {
  const {resp, setResp} = useContext(RespContext);

  return (
    <div className={`sm:w-2/6 w-full bg-[#3e3c61] h-screen overflow-auto  ${resp ? "hidden" : "block"} md:block sm:block`}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
