import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import {  RespContextProvider } from "./context/RespContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <RespContextProvider>
          <App />
        </RespContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
