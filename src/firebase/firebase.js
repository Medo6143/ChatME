// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXMkRwZY_BtOPb0CwPwwNBJ1C3ak41nDw",
  authDomain: "chat-6e458.firebaseapp.com",
  projectId: "chat-6e458",
  storageBucket: "chat-6e458.appspot.com",
  messagingSenderId: "529372729824",
  appId: "1:529372729824:web:9acc4085d7cab6d5089b85",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
