import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import CodeLayout from "../components/layouts/CodeLayout";
import { CodeCont } from "../contexts/CodeContext";
import { CodeSettingsCont } from "../contexts/CodeSettingsContext";
import CodeEditor from "../components/code/Editor";
import HTMLRenderer from "../components/code/HTMLRender";
import Loading from "../components/shared/code/Loading";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../utils/CodeUtils";
import { getProject, updateProject } from "../functions/project";
import { throttle } from "lodash";
import {
  FileID,
  filesTypeType,
  insertTextType,
} from "../types/functions/project";
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
  const lastSentTextRef = useRef({ html: "", css: "", js: "" });
  const [saveLoading, setsaveLoading] = useState(false);

  const saveFunc = () => {
    updateProject({
      id: activeID,
      codeName,
      setLoading: setsaveLoading,
    });
  };
  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isSaveKey = (isMac && e.metaKey) || (!isMac && e.ctrlKey);

      if (isSaveKey && e.key === "s") {
        e.preventDefault(); // Prevent browser save
        saveFunc(); // 🔥 Call your save function here
      }
    };

    window.addEventListener("keydown", handleSaveShortcut);

    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);

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
  } = useContext(CodeCont);
  const { setCodeName, codeName, theme, fontSize, editorNotMounted } =
    useContext(CodeSettingsCont);

  // let user: any = localStorage.getItem("devbin_user");
  // user = JSON.parse(user);
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
  }, [activeID]);

  useEffect(() => {
    setLive(live);
    handleJoin({ live, socket, activeID, setLiveError });
  }, [live]);
  useEffect(() => {
    localStorage.setItem("HTML", HTML);

    const timeoutId = setTimeout(() => {
      if (live) {
        // Save the content
        save({
          socket,
          room: activeID,
          content: HTML,
          file: filesID.HTMLID,
        });

        handleSucessError(socket);

        lastSentTextRef.current["html"] = HTML;

        // Send insertText
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

        // Send deleteText
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
      }
    }, 1500);

    return () => clearTimeout(timeoutId); // Cancel previous timeout if user types again
  }, [HTML]);

  useEffect(() => {
    localStorage.setItem("CSS", CSS);

    const timeoutId = setTimeout(() => {
      if (live) {
        save({
          socket,
          room: activeID,
          content: CSS,
          file: filesID.CSSID,
        });

        handleSucessError(socket);

        lastSentTextRef.current["css"] = CSS;

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
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [CSS]);

  useEffect(() => {
    localStorage.setItem("JS", JS);

    const timeoutId = setTimeout(() => {
      if (live) {
        save({
          socket,
          room: activeID,
          content: JS,
          file: filesID.JSID,
        });

        handleSucessError(socket);

        lastSentTextRef.current["js"] = JS;

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
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [JS]);

  useEffect(() => {
    const onInsertText = (data: insertTextType) => {
      if (data?.fileType === "html") {
        setHTML(data.text);
      } else if (data?.fileType === "css") {
        setCSS(data.text);
      } else {
        setJS(data.text);
      }
    };
    socket.on("insertText", onInsertText);
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

  if (!navigator.onLine) {
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
