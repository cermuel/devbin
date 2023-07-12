import React from "react";
import { FiMaximize2 } from "react-icons/fi";
//@ts-ignore
import userIMG from "./../../../assets/main.jpeg";

const Projects = () => {
  let html = "<h1 id='welcome'>Hello world!</h1>";
  let css = `h1{
    color: red
}
body{
    background-color: #737cde;
}`;
  let js = "const welcome = document.getElementById('welcome');";
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
    <div className="sm:w-[400px] flex flex-col rounded-md p-4 h-80 w-full relative bg-gray-700 m-4 transition-all hover:scale-110">
      <button className="absolute z-50 text-white p-1 bg-gray-400 text-lg opacity-80 top-2 right-2">
        <FiMaximize2 />
      </button>
      <iframe
        srcDoc={srcDoc}
        title="Output"
        sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-encrypted-media allow-credentials allow-downloads-without-user-activation"
        width="100%"
        height="80%"
        className="hover:absolute rounded-sm top-[-15px] left-[-15px]"
      />
      <div className="flex absolute bottom-4 mt-4 gap-2 items-center h-10 flex-grow">
        <img src={userIMG} className="h-9 rounded-sm" alt="" />
        <div className="h-[80%] flex flex-col justify-center gap-1">
          <p className="font-semibold text-white leading-3">Demo User</p>
          <span className="text-sm text-gray-200 leading-3">
            demouser@mail.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
