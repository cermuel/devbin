// import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

const CodeEditor = ({
  theme,
  fontSize,
  file,
  toShow,
  showMinScreen,
}: {
  theme: string;
  fontSize: number;
  file: any;
  toShow: string[];
  showMinScreen: string;
}) => {
  return (
    <div
      className={`md:min-w-[100px] w-full flex-grow ${
        showMinScreen !== file.name && "max-md:hidden"
      }`}
    >
      <div className="w-full max-md:hidden h-10 bg-[#101010]">
        <button className="bg-[#1e1e1e] p-2 gap-2 flex items-center h-full">
          {file.name == "HTML" ? (
            <FaHtml5 className="text-[#f06529]" />
          ) : file.name == "CSS" ? (
            <FaCss3 className="text-[#3872fa]" />
          ) : (
            <SiJavascript className="text-[#f7df1e]" />
          )}
          <span className="text-gray-300 font-medium">
            {file.name !== "JAVASCRIPT" ? file.name : "JS"}
          </span>
        </button>
      </div>
      <Editor
        height="100%"
        width="100%"
        theme={theme}
        value={file.value}
        onChange={(e: any) => {
          file.setValue(e);
        }}
        saveViewState={true}
        options={{
          formatOnType: true,
          formatOnPaste: true,
          fontSize: fontSize,
          readOnly: false,
          wordWrap: "on",
          autoClosingQuotes: true,
          automaticLayout: true,
          autoClosingBrackets: "languageDefined",
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          padding: {
            top: 10,
          },
        }}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
};

export default CodeEditor;
