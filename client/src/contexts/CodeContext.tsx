import React, { useEffect, useLayoutEffect, useState } from "react";
import { CodeContType } from "../types/context";
import io from "socket.io-client";
import { handleJoin } from "../utils/ProjectUtils";

const localStorageValueHTML = localStorage.getItem("HTML");
const localStorageValueCSS = localStorage.getItem("CSS");
const localStorageValueJS = localStorage.getItem("JS");
const localStorageID = localStorage.getItem("devbin_activecode");
const token = localStorage.getItem("devbin_token");

let socket: any = io("http://localhost:5000", {
  auth: {
    token: token,
  },
});

export const CodeCont = React.createContext<CodeContType>({
  HTML: localStorageValueHTML
    ? localStorageValueHTML
    : "<h1 id='welcome'>Hello world!</h1>",
  setHTML: () => {},
  CSS: localStorageValueCSS
    ? localStorageValueCSS
    : `h1{
      color: red
}
body{
      background-color: #737cde;
}`,
  setCSS: () => {},
  JS: localStorageValueJS
    ? localStorageValueJS
    : "const welcome = document.getElementById('welcome');",
  setJS: () => {},
  activeID: localStorageID ? localStorageID : "",
  setactiveID: () => {},
  socket,
  live: false,
  setLive: () => {},
  liveError: "Error going live, try again!",
  setLiveError: () => {},
});

const CodeContext = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    socket.on("session", (data: any) => {
      const { sessionId, user } = data;
      socket.auth = { sessionId };
      socket.user = { user };
      socket.userId = user._id;
      localStorage.setItem("devbin_sessionId", sessionId);
      localStorage.setItem("devbin_user", JSON.stringify(user));
    });
  }, []);
  const [HTML, setHTML] = useState<string>(() => {
    return localStorageValueHTML
      ? localStorageValueHTML
      : "<h1 id='welcome'>Hello world!</h1>";
  });

  const [CSS, setCSS] = useState<string>(() => {
    return localStorageValueCSS
      ? localStorageValueCSS
      : `h1{
        color: red
}
  body{
        background-color: #737cde;
}`;
  });
  const [JS, setJS] = useState<string>(() => {
    return localStorageValueJS
      ? localStorageValueJS
      : "const welcome = document.getElementById('welcome');";
  });
  const [activeID, setactiveID] = useState<string>(() => {
    return localStorageID ? localStorageID : "";
  });
  const [live, setLive] = useState<boolean>(false);
  const [liveError, setLiveError] = useState<string>(
    "Error going live, try again!"
  );
  useEffect(() => {
    handleJoin({ live, setLiveError, socket, activeID });
    console.log(`ran`);
  }, []);
  useEffect(() => {
    console.log(liveError);
  }, [liveError]);

  useEffect(() => {
    localStorage.setItem("devbin_activecode", activeID);
  }, [activeID]);
  return (
    <CodeCont.Provider
      value={{
        live,
        setLive,
        HTML,
        setHTML,
        CSS,
        setCSS,
        JS,
        setJS,
        activeID,
        setactiveID,
        socket,
        liveError,
        setLiveError,
      }}
    >
      {children}
    </CodeCont.Provider>
  );
};

export default CodeContext;
