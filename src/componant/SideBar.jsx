import { Chats } from "./Chats";
import { Navbar } from "./Navbar";
import { Search } from "./Search";

export const SideBar = () => {
  return (
    <div className="w-2/6 bg-[#3e3c61] h-screen overflow-auto  hidden md:block sm:block">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
