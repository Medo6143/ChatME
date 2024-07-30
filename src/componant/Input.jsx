import { useContext, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { MdImage } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      // Check if Enter key is pressed or click event on send button
      e.preventDefault(); // Prevent default form submission behavior

      if (text.trim() === "" && !img) {
        return; // Exit early if both text and img are empty
      }

      if (img) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        try {
          const snapshot = await uploadTask;

          const downloadURL = await getDownloadURL(snapshot.ref);

          await updateFirestoreWithMessage(downloadURL);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      } else {
        await updateFirestoreWithMessage();
      }

      // Update last message in userChats collection
      await updateLastMessageInUserChats();

      // Reset input fields
      setText("");
      setImg(null);
    }
  };

  const updateFirestoreWithMessage = async (downloadURL = null) => {
    const message = {
      id: uuid(),
      text: text.trim(),
      senderId: currentUser.uid,
      date: Timestamp.now(),
      img: downloadURL,
    };

    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(message),
      });
    } catch (error) {
      console.error("Error updating firestore with message: ", error);
    }
  };

  const updateLastMessageInUserChats = async () => {
    if (data.chatId) {
      const updateObj = {
        [`${data.chatId}.lastMessage`]: {
          text: text.trim(),
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      };

      try {
        await updateDoc(doc(db, "userChats", currentUser.uid), updateObj);
        await updateDoc(doc(db, "userChats", data.user.uid), updateObj);
      } catch (error) {
        console.error("Error updating last message in userChats: ", error);
      }
    } else {
      console.error("Error: data.chatId is null");
    }
  };

  return (
    <div className="flex justify-center align-middle w-full h-20 p-3 ">
      <input
        type="text"
        placeholder="Write Message...."
        dir="auto"
        className="w-11/12 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleSend}
      />

      <div className="flex justify-center align-middle gap-5 p-2 sm:p-6">
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file" className="cursor-pointer">
          <MdImage size={25} />
        </label>
        <span className="cursor-pointer">
          <IoSendSharp size={25} onClick={handleSend} />
        </span>
      </div>
    </div>
  );
};
