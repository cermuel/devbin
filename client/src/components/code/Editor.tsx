// import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { CodeSettingsCont } from "../../contexts/CodeSettingsContext";
import { useContext } from "react";
import { CodeCont } from "../../contexts/CodeContext";

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
  const { setEditorNotMounted } = useContext(CodeSettingsCont);
  const {
    setHTMLCursor,
    setCSSCursor,
    setJSCursor,
    setHTMLEditor,
    setCSSEditor,
    setJSEditor,
  } = useContext(CodeCont);
  const handleEditorDidMount = async (editor: any) => {
    setEditorNotMounted(false);
    if (file.name === "HTML") {
      setHTMLEditor(editor);
    }
    if (file.name === "CSS") {
      setCSSEditor(editor);
    }
    if (file.name === "JS" || file.name === "JAVASCRIPT") {
      setJSEditor(editor);
    }

    // editorRef.current = editor;
    // setEditor(editor);
    editor.onDidChangeCursorPosition(handleCursorPositionChange);
  };
  const handleCursorPositionChange = (e: any) => {
    // Get the updated cursor position
    const newPosition = e.position;

    // You can access line and column numbers as follows
    const line = newPosition.lineNumber;
    const column = newPosition.column;

    let cursor = { line, column };

    if (file.name === "HTML") {
      setHTMLCursor(cursor);
    } else if (file.name === "CSS") {
      setCSSCursor(cursor);
    } else {
      setJSCursor(cursor);
    }
  };

  return (
    <div
      className={`md:min-w-[100px] w-full z-0 flex-grow ${
        showMinScreen !== file.name && "max-md:hidden"
      }`}
    >
      <div className="w-full max-md:hidden h-10 bg-[#101010]">
        <button className="bg-[#1e1e1e] p-2 gap-2 flex items-center h-full">
          {file.name === "HTML" ? (
            <FaHtml5 className="text-[#f06529]" />
          ) : file.name === "CSS" ? (
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
        onMount={handleEditorDidMount}
        saveViewState={true}
        options={{
          formatOnType: true,
          formatOnPaste: true,
          fontSize: fontSize,
          readOnly: false,
          wordWrap: "on",
          autoClosingQuotes: "always",
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
