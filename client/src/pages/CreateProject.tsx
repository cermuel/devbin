import React, { Dispatch, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import { CodeCont } from "../contexts/CodeContext";
import { createProject } from "../functions/project";
import { filesTypeType, projectType } from "../types/functions/project";

const CreateProject = () => {
  const files = {
    HTML: "<h1 id='welcome'>Welcome to DevBIN👋🏽!</h1>",
    CSS: `h1{
      color: #737cde;
}
body{
      background-color: white;
}`,
    JS: "const welcome = document.getElementById('welcome');",
  };
  const [codeName, setcodeName] = useState<string>("");
  const [saveLoading, setsaveLoading] = useState<boolean>(false);
  const [inputActive, setInputActive] = useState<boolean>(false);
  let navigate = useNavigate();
  return (
    <>
      <NavTwo show={"true"} />
      <main className="w-screen h-screen px-8 gap-12 flex-col bg-black flex justify-center items-center">
        <Toaster />
        <h1 className="w-full text-center text-4xl sm:text-5xl font-extrabold">
          <span
            className="
          text-white"
          >
            CREATE
          </span>{" "}
          <span className="text-pry">PROJECT</span>
        </h1>
        <div className="flex relative flex-col gap-4 sm:w-[500px] w-full">
          <label
            className={`${
              inputActive
                ? "absolute top-[-24px] rounded-[4px] text-[#a2a9f7]"
                : "hidden"
            }  tracking-tight space-w-3 text-xs`}
          >
            {"Project Name"}
          </label>
          <input
            onFocus={() => {
              setInputActive(true);
            }}
            onBlur={() => {
              setInputActive(false);
            }}
            type="text"
            onChange={(e: any) => setcodeName(e.target.value)}
            maxLength={20}
            placeholder="Project Name"
            className="bg-transparent outline-none text-white text-xl w-full border-b-2 "
          />
          <button
            onClick={() => {
              const project: projectType = {
                name: codeName,
                files: [
                  {
                    type: filesTypeType.html,
                    text: files.HTML,
                  },
                  {
                    type: filesTypeType.css,
                    text: files.CSS,
                  },
                  {
                    type: filesTypeType.js,
                    text: files.JS,
                  },
                ],
              };
              createProject({ project, setsaveLoading, navigate });
            }}
            className={`bg-pry  w-32 py-3 text-white rounded-md flex justify-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] hover:shadow-none ${
              saveLoading && "opacity-70 cursor-not-allowed"
            }`}
            disabled={saveLoading}
          >
            {saveLoading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </main>
    </>
  );
};

export default CreateProject;
