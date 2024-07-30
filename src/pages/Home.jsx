import { SideBar } from "../componant/SideBar";
import { Chat } from "../componant/Chat";

export const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <Chat />
    </div>
  );
};
