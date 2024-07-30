import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { RespContext } from "../context/RespContext";

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { resp, setResp } = useContext(RespContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data()); // Fixed error here
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });

    setResp(!resp);
  };

  return (
    <div>
      {chats &&
        Object.entries(chats)
          .sort((a, b) => new Date(b[1].date) - new Date(a[1].date))
          .map((chat) => (
            <div
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
              className="flex items-center cursor-pointer hover:bg-[#2a2a54] p-4 transition-all delay-100 w-full"
            >
              <img
                src={chat[1].userInfo && chat[1].userInfo.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col text-center">
                <p className="mr-2 font-serif font-bold text-white">
                  {chat[1].userInfo?.displayName}
                </p>
                <p className="text-white text-xs">
                  {chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
