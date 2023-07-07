import React, { useContext, useEffect, useState } from "react";
import CodeLayout from "../components/layouts/CodeLayout";
import { CodeCont } from "../contexts/CodeContext";
import { CodeSettingsCont } from "../contexts/CodeSettingsContext";
import CodeEditor from "../Editor";
import HTMLRenderer from "../HTMLRender";
import Loading from "../components/shared/Loading";

const Code = () => {
  const { theme, fontSize, editorNotMounted } = useContext(CodeSettingsCont);
  const { HTML, CSS, JS, setHTML, setCSS, setJS } = useContext(CodeCont);
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

  // window.addEventListener("keydown", (event) => {
  //   if ((event.metaKey || event.ctrlKey) && event.key === "s") {
  //     event.preventDefault(); // Prevent the default "Save As" browser behavior
  //     alert(`ctrl + s`); // Call your save function here
  //   }
  // });
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
            showMinScreen == toShow[3] && "max-md:hidden"
          }`}
        >
          {editors.map((file: any) => {
            return (
              <CodeEditor
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
            showMinScreen == toShow[3] ? "max-md:h-full" : "max-md:h-[50%"
          }`}
        >
          <HTMLRenderer html={HTML} css={CSS} js={JS} />
        </section>
      </>
    </CodeLayout>
  );
};

export default Code;
