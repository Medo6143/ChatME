import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  return (
    <div className="flex gap-5 mb-6 flex-col ">
      <div
        className={`flex mt-3 gap-4 ${message.senderId === currentUser.uid ? null : "flex-row-reverse"}`}
        ref={ref}
      >
        <div className="flex flex-col items-center text-gray-500 font-light mt-3 ml-3">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="user"
            className="w-16 h-10 rounded-full  "
          />
          <span className="text-xs mt-1">Just now</span>
        </div>

        <div
          className={`flex flex-col gap-2.5 max-w-4/5 mt-8 ${message.senderId === currentUser.uid ? null : "items-end"}`}
        >
          <p
            className={`p-2.5 font-sans rounded-lg max-w-max ${message.senderId === currentUser.uid ? "bg-blue-500  rounded-tl-none " : "bg-white rounded-tr-none"} `}
          >
            {message.text}
          </p>
          {message.img && (
            <img
              src={message.img}
              className="w-2/5 rounded-lg"
              alt="Message content"
            />
          )}
        </div>
      </div>
    </div>
  );
};
