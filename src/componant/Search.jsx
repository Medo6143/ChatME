import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";

export const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Ensure to use the correct path for updating userChats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true); // Handle the error properly
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div>
      {/* create input for search user from database */}
      <input
        type="text"
        name=""
        placeholder="Find User "
        className="w-full bg-transparent p-1 outline-none text-white mt-1"
        onKeyDown={handleKey}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* the user from search */}
      {err ? <span>User not found</span> : null}
      {user && (
        <div
          className="flex items-center mt-4 cursor-pointer hover:bg-[#2a2a54] p-3 w-full"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt="user"
            className="w-7 h-7 rounded-full mr-2"
          />
          <p className="mr-2 font-serif font-bold text-white">
            {user.displayName}
          </p>
        </div>
      )}
      <hr className="mt-2" />
    </div>
  );
};
