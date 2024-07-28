import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { FaArrowLeft } from "react-icons/fa";
import { RespContext } from "../context/RespContext";
export const Chat = () => {
  const { data } = useContext(ChatContext);
  const { resp, setResp } = useContext(RespContext);

  return (
    <div
      className={`w-full h-screen overflow-hidden sm:block ${!resp ? "hidden" : "block"} `}
    >
      {/*  User info  */}
      <div className="bg-[#5d5b8d]  p-3 flex justify-between overflow-hidden">
        <span className="text-white  font-bold flex gap-3 justify-center ">
          <span onClick={() => setResp(!resp)} className="text-blue-950 bg-gray-500 p-2 cursor-pointer hover:bg-gray-900 sm:hidden block">
            {" "}
            <FaArrowLeft  />
          </span>
          {data.user?.displayName}
        </span>
        {/* Icons */}
        <div className="flex gap-5 text-white">
          <BsFillCameraVideoFill />
          <IoPersonAdd />
          <MdMoreHoriz />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
