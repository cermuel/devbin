import React, { useEffect, useLayoutEffect, useState } from "react";
import { CodeContType, cursorType } from "../types/context";
import io from "socket.io-client";
import { handleJoin } from "../utils/ProjectUtils";

const localStorageValueHTML = localStorage.getItem("HTML");
const localStorageValueCSS = localStorage.getItem("CSS");
const localStorageValueJS = localStorage.getItem("JS");
const localStorageID = localStorage.getItem("devbin_activecode");
const token = localStorage.getItem("devbin_token");
const BASEURL = process.env.REACT_APP_BASE_URL || "";

let socket: any = io("https://devbin.oreos.me/", {
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
  HTMLCursor: { line: 0, column: 0 },
  setHTMLCursor: () => {},
  CSSCursor: { line: 0, column: 0 },
  setCSSCursor: () => {},
  JSCursor: { line: 0, column: 0 },
  setJSCursor: () => {},
  HTMLEditor: null,
  setHTMLEditor: () => {},
  CSSEditor: null,
  setCSSEditor: () => {},
  JSEditor: null,
  setJSEditor: () => {},
});

export const handleSession = () => {
  console.log("handled session");
  socket.on("session", (data: any) => {
    console.log({ data });
    const { sessionId, user } = data;
    console.log({ sessionId, user });
    socket.auth = { sessionId };
    socket.user = { user };
    socket.userId = user._id;
    localStorage.setItem("devbin_sessionId", sessionId);
    localStorage.setItem("devbin_user", JSON.stringify(user));
  });
};

const CodeContext = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    console.log({ socket });
    handleSession();
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
  const [HTMLCursor, setHTMLCursor] = useState<cursorType>({
    line: 0,
    column: 0,
  });
  const [CSSCursor, setCSSCursor] = useState<cursorType>({
    line: 0,
    column: 0,
  });
  const [JSCursor, setJSCursor] = useState<cursorType>({ line: 0, column: 0 });
  const [HTMLEditor, setHTMLEditor] = useState(null);
  const [CSSEditor, setCSSEditor] = useState(null);
  const [JSEditor, setJSEditor] = useState(null);

  useEffect(() => {
    handleJoin({ live, setLiveError, socket, activeID });
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
        HTMLEditor,
        setHTMLEditor,
        CSSEditor,
        setCSSEditor,
        JSEditor,
        setJSEditor,
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
        HTMLCursor,
        setHTMLCursor,
        CSSCursor,
        setCSSCursor,
        JSCursor,
        setJSCursor,
      }}
    >
      {children}
    </CodeCont.Provider>
  );
};

export default CodeContext;
