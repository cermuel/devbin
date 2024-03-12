import { useContext, useEffect, useLayoutEffect, useState } from "react";
import CodeLayout from "../components/layouts/CodeLayout";
import { CodeCont } from "../contexts/CodeContext";
import { CodeSettingsCont } from "../contexts/CodeSettingsContext";
import CodeEditor from "../components/code/Editor";
import HTMLRenderer from "../components/code/HTMLRender";
import Loading from "../components/shared/code/Loading";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../utils/CodeUtils";
import { getProject } from "../functions/project";
import {
  FileID,
  filesTypeType,
  insertTextType,
} from "../types/functions/project";
import * as monaco from "@monaco-editor/react";
import {
  deleteText,
  handleJoin,
  handleSucessError,
  insertText,
  save,
  toShow,
} from "../utils/ProjectUtils";
import toast, { Toaster } from "react-hot-toast";
import Offline from "../components/code/Offline";

const Code = () => {
  const navigate = useNavigate();

  //
  //context
  const {
    HTML,
    CSS,
    JS,
    setHTML,
    setCSS,
    setJS,
    activeID,
    socket,
    live,
    setLive,
    setLiveError,
    HTMLCursor,
    CSSCursor,
    JSCursor,
    HTMLEditor,
    CSSEditor,
    JSEditor,
  } = useContext(CodeCont);
  const { setCodeName, theme, fontSize, editorNotMounted } =
    useContext(CodeSettingsCont);

  let user: any = localStorage.getItem("devbin_user");
  user = JSON.parse(user);
  // console.log({ activeID, live, user: user._id });
  //
  //states
  const [filesID, setFilesID] = useState<FileID>({
    HTMLID: "",
    CSSID: "",
    JSID: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showMinScreen, setshowMinScreen] = useState<string>("HTML");

  //
  //effects
  useLayoutEffect(() => {
    const toSend = {
      id: activeID,
      setHTML,
      setCSS,
      setJS,
      setLoading,
      setCodeName,
      setFilesID,
    };
    isAuth(navigate);
    activeID !== "" && getProject(toSend);
  }, []);

  useEffect(() => {
    setLive(live);
    handleJoin({ live, socket, activeID, setLiveError });
  }, [live]);

  useEffect(() => {
    localStorage.setItem("HTML", HTML);
    live == true &&
      save({
        socket,
        room: activeID,
        content: HTML,
        file: filesID.HTMLID,
      });

    handleSucessError(socket);

    insertText({
      socket,
      room: activeID,
      file: filesID.HTMLID,
      data: {
        timestamp: new Date(),
        cursorPosition: HTMLCursor,
        text: HTML,
      },
      fileType: "html",
    });
    deleteText({
      socket,
      room: activeID,
      file: filesID.HTMLID,
      data: {
        timestamp: new Date(),
        cursorPosition: HTMLCursor,
        text: HTML,
      },
      fileType: "html",
    });
  }, [HTML]);

  useEffect(() => {
    localStorage.setItem("CSS", CSS);
    live == true &&
      save({
        socket,
        room: activeID,
        content: CSS,
        file: filesID.CSSID,
      });

    handleSucessError(socket);
    insertText({
      socket,
      room: activeID,
      file: filesID.CSSID,
      data: {
        timestamp: new Date(),
        cursorPosition: CSSCursor,
        text: CSS,
      },
      fileType: filesTypeType.css,
    });
    deleteText({
      socket,
      room: activeID,
      file: filesID.CSSID,
      data: {
        timestamp: new Date(),
        cursorPosition: CSSCursor,
        text: CSS,
      },
      fileType: filesTypeType.css,
    });
  }, [CSS]);

  useEffect(() => {
    localStorage.setItem("JS", JS);
    live == true &&
      save({
        socket,
        room: activeID,
        content: JS,
        file: filesID.JSID,
      });

    handleSucessError(socket);
    insertText({
      socket,
      room: activeID,
      file: filesID.JSID,
      data: {
        timestamp: new Date(),
        cursorPosition: JSCursor,
        text: JS,
      },
      fileType: filesTypeType.js,
    });
    deleteText({
      socket,
      room: activeID,
      file: filesID.JSID,
      data: {
        timestamp: new Date(),
        cursorPosition: JSCursor,
        text: JS,
      },
      fileType: filesTypeType.js,
    });
  }, [JS]);

  useEffect(() => {
    socket.on("insertText", (data: insertTextType) => {
      console.log({ insertText: data });
      if (data) {
        if (data.fileType === filesTypeType.html) {
          setHTML(data.text);
        } else if (data.fileType === filesTypeType.css) {
          setCSS(data.text);
        } else {
          setJS(data.text);
        }
      }
    });
  }, [socket]);

  const editors = [
    {
      name: "HTML",
      language: "html",
      value: HTML,
      setValue: setHTML,
    },
    {
      name: "CSS",
      language: "css",
      value: CSS,
      setValue: setCSS,
    },
    {
      name: "JAVASCRIPT",
      language: "javascript",
      value: JS,
      setValue: setJS,
    },
  ];

  if (navigator.onLine) {
    return <Offline />;
  } else {
    if (activeID && activeID !== "") {
      return (
        <CodeLayout
          toShow={toShow}
          setShowMinScreen={setshowMinScreen}
          showMinScreen={showMinScreen}
        >
          {editorNotMounted && <Loading />}
          <>
            <section
              className={`w-screend flex gap-1 bg-pry overflow-hidden h-[50%] ${
                showMinScreen === toShow[3] && "max-md:hidden"
              }`}
            >
              {editors.map((file: any, i: number) => {
                return (
                  <CodeEditor
                    key={i}
                    showMinScreen={showMinScreen}
                    toShow={toShow}
                    file={file}
                    fontSize={fontSize}
                    theme={theme}
                  />
                );
              })}
            </section>
            <section
              className={`w-screen h-[50%] ${
                showMinScreen === toShow[3] ? "max-md:h-full" : "max-md:h-[50%"
              }`}
            >
              <HTMLRenderer html={HTML} css={CSS} js={JS} />
            </section>
          </>
        </CodeLayout>
      );
    } else if (loading) {
      return <Loading />;
    } else {
      return (
        <CodeLayout
          toShow={toShow}
          setShowMinScreen={setshowMinScreen}
          showMinScreen={showMinScreen}
        >
          <div className="border-8">
            <Toaster />
            <div className="w-full h-full flex-col flex justify-center items-center">
              <p className="text-2xl font-bold mb-1">
                You have 0 active projects
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    navigate("/code/profile");
                  }}
                  className="bg-pry text-white rounded-sm py-2 px-6"
                >
                  My Projects
                </button>
                <button
                  onClick={() => {
                    navigate("/code/bin/new");
                  }}
                  className="bg-pry text-white rounded-sm py-2 px-6"
                >
                  Create One
                </button>
              </div>
            </div>
          </div>
        </CodeLayout>
      );
    }
  }
};

export default Code;
