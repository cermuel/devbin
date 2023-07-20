import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import CodeLayout from "../components/layouts/CodeLayout";
import { CodeCont } from "../contexts/CodeContext";
import { CodeSettingsCont } from "../contexts/CodeSettingsContext";
import CodeEditor from "../components/code/Editor";
import HTMLRenderer from "../components/code/HTMLRender";
import Loading from "../components/shared/code/Loading";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../utils/ChatUtils";
import { getProject } from "../functions/project";

const Code = () => {
  const navigate = useNavigate();
  const { HTML, CSS, JS, setHTML, setCSS, setJS, activeID, socket } =
    useContext(CodeCont);

  const { setCodeName, codeName } = useContext(CodeSettingsCont);
  let savedID = localStorage.getItem("devbin_activecode");
  useLayoutEffect(() => {
    isAuth(navigate);
    activeID !== "" &&
      getProject({
        id: activeID,
        setHTML,
        setCSS,
        setJS,
        setLoading,
        setCodeName,
      });
  }, []);
  const { theme, fontSize, editorNotMounted } = useContext(CodeSettingsCont);

  console.log(socket);
  useEffect(() => {
    localStorage.setItem("HTML", HTML);
  }, [HTML]);
  useEffect(() => {
    localStorage.setItem("CSS", CSS);
  }, [CSS]);
  useEffect(() => {
    localStorage.setItem("JS", JS);
  }, [JS]);

  let toShow = ["HTML", "CSS", "JAVASCRIPT", "OUTPUT"];
  const [loading, setLoading] = useState<boolean>(false);
  const [showMinScreen, setshowMinScreen] = useState<string>("HTML");
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
        <>
          <div className="w-full h-full flex-col flex justify-center items-center">
            <p className="text-2xl font-bold mb-1">
              {" "}
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
        </>
      </CodeLayout>
    );
  }
};

export default Code;
