import React, { useState } from "react";
import { CodeContType } from "../types/context";

const localStorageValueHTML = localStorage.getItem("HTML");
const localStorageValueCSS = localStorage.getItem("CSS");
const localStorageValueJS = localStorage.getItem("JS");
const localStorageID = localStorage.getItem("devbin_activecode");

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
});

const CodeContext = ({ children }: { children: React.ReactNode }) => {
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
  return (
    <CodeCont.Provider
      value={{ HTML, setHTML, CSS, setCSS, JS, setJS, activeID, setactiveID }}
    >
      {children}
    </CodeCont.Provider>
  );
};

export default CodeContext;
