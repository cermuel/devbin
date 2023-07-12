import React, { useState } from "react";
import { CodeContType } from "../types/context";

const localStorageValueHTML = localStorage.getItem("HTML");
const localStorageValueCSS = localStorage.getItem("CSS");
const localStorageValueJS = localStorage.getItem("JS");

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
  return (
    <CodeCont.Provider value={{ HTML, setHTML, CSS, setCSS, JS, setJS }}>
      {children}
    </CodeCont.Provider>
  );
};

export default CodeContext;
