import React, { useEffect } from "react";
import { FiMaximize2 } from "react-icons/fi";
//@ts-ignore
import userIMG from "./../../../assets/main.jpeg";
import { CodeCont } from "../../../contexts/CodeContext";
import { Link, useNavigate } from "react-router-dom";
import { selectProject } from "../../../utils/ProjectUtils";

const Projects = ({
  html,
  css,
  js,
  projectName,
  id,
  owner,
}: {
  html: string;
  css: string;
  js: string;
  projectName: string;
  id: string;
  owner?: string;
}) => {
  const { setactiveID } = React.useContext(CodeCont);
  const navigate = useNavigate();

  let srcDoc = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script type="text/javascript">${js}</script>
        </body>
      </html>
    `;

  return (
    <div className="sm:w-[500px] flex flex-col h-64 sm:h-80 w-full relative m-4">
      <div className="absolute w-full opacity-0 hover:opacity-80 flex flex-col justify-center items-center gap-2 rounded-md bg-white h-[80%]">
        <button
          onClick={() => selectProject({ id, setactiveID, navigate })}
          className="w-28 rounded-3xl h-8 flex justify-center items-center bg-pry text-sm text-white"
        >
          SELECT
        </button>{" "}
        {owner && (
          <Link to={`/code/profile/${owner}`}>
            <button className="w-28 rounded-3xl h-8 flex justify-center items-center border-pry border-2 text-sm text-pry">
              USER
            </button>
          </Link>
        )}
      </div>
      <div className="hover:opacity-20 w-full h-[80%]">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-encrypted-media allow-credentials allow-downloads-without-user-activation"
          width="100%"
          height="100%"
          className="rounded-md"
        />
      </div>
      <div>
        <p className="text-white uppercase mt-2 text-xs font-medium">
          {projectName}
        </p>
      </div>
    </div>
  );
};

export default Projects;
