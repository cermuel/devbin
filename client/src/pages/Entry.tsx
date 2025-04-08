import { useNavigate } from "react-router-dom";
//@ts-ignore
import EntryImage from "../assets/entry.svg";

const Entry = () => {
  let isAuth = localStorage.getItem("devbin_token");
  let navigate = useNavigate();

  return (
    <div className="bg-black relative overflow-scroll w-screen h-screen sm:px-14 md:px-28 px-6">
      <nav className="text-white top-0 absolute left-0 flex w-full justify-between items-center p-6 sm:px-14 md:px-28">
        <div>
          <button className="text-pry font-bold">DEVBIN</button>
        </div>
        <button
          onClick={() => {
            isAuth ? navigate("/code/home") : navigate("/auth/login");
          }}
          className="underline hover:no-underline"
        >
          {isAuth ? "Go Home" : "Login"}
        </button>
      </nav>
      <section className="text-white md:h-screen relative flex gap-8 items-center max-md:justify-center max-md:mt-20 max-md:flex-col max-md:pb-20">
        <img src={EntryImage} className="w-[300px] md:hidden" alt="" />
        <div className="flex flex-col flex-1 gap-4 items-start">
          <h1 className="md:text-7xl text-3xl font-bold leading-snug w-full">
            The whole digital <br className="max-md:hidden" /> mix is in{" "}
            <span className="bg-pry tracking-wider px-2">DevBIN</span>
          </h1>
          <p className="md:text-xl text-sm text-gray-300 tracking-wide w-full">
            A modern platform for seamless coding collaboration. Whether you're
            pairing with teammates or reviewing pull requests, DevBIN takes your
            workflow to the next level with powerful features and live
            collaboration tools.
          </p>
          <button
            onClick={() => {
              isAuth ? navigate("/code/home") : navigate("/auth/login");
            }}
            className="border-[1px] hover:text-black hover:bg-white mt-2 text-xs md:text-sm border-white text-white px-8 py-2 md:px-10 md:py-3"
          >
            Explore
          </button>
        </div>
        <img src={EntryImage} className="w-[600px] max-md:hidden" alt="" />
      </section>
      <section className="text-white h-screen max-md:h-auto relative flex max-md:flex-wrap gap-4 justify-center items-start">
        <div className="md:w-[50%] md:h-full w-full flex justify-center items-center">
          <h1 className="md:text-6xl text-3xl font-bold text-white">
            6 features of <span className="text-pry">DevBIN</span> <br /> that
            can help you become a better programmer{" "}
          </h1>
        </div>
        <div className="md:w-[50%] md:h-full flex w-full justify-center items-center">
          <ul className="w-full overflow-y-scroll overflow-x-hidden h-[70%]">
            <li className="border-b-white p-10 max-sm:px-0 border-b-2 w-full gap-10 flex items-center">
              <h2 className="text-6xl font-bold">1</h2>
              <p className="text-sm font-sans w-[400px]">
                Code autocompletion: Autocompletion suggests code snippets,
                function names, and variable names as you type, which can save
                time and reduce errors.
              </p>
            </li>{" "}
            <li className="border-b-white p-10 max-sm:px-0 border-b-2 w-full gap-10 flex items-center">
              <h2 className="text-6xl font-bold">2</h2>
              <p className="text-sm font-sans w-[400px]">
                Syntax highlighting: This feature highlights different elements
                of the code with different colors, making it easier to identify
                and understand the code's structure.
              </p>
            </li>{" "}
            <li className="border-b-white p-10 max-sm:px-0 border-b-2 w-full gap-10 flex items-center">
              <h2 className="text-6xl font-bold">3</h2>
              <p className="text-sm font-sans w-[400px]">
                Real-time collaboration: This feature enables multiple
                developers to work on the same project simultaneously,
                facilitating collaboration, pair programming, and faster
                development cycles.
              </p>
            </li>{" "}
            <li className="border-b-white p-10 max-sm:px-0 border-b-2 w-full gap-10 flex items-center">
              <h2 className="text-6xl font-bold">4</h2>
              <p className="text-sm font-sans w-[400px]">
                Project viewing: Users can view other users' projects, exploring
                their code, structure, and functionality to gain insights and
                learn from their work.
              </p>
            </li>{" "}
            <li className="border-b-white p-10 max-sm:px-0 border-b-2 w-full gap-10 flex items-center">
              <h2 className="text-6xl font-bold">5</h2>
              <p className="text-sm font-sans w-[400px]">
                Intelligent code navigation: Allows quick navigation through
                codebases, jump to function definitions, find usages of
                variables or functions, and easily switch between files.
              </p>
            </li>{" "}
            <li className="md:border-b-white p-10 max-sm:px-0 md:border-b-2 w-full gap-10 flex items-center">
              <h2 className="text-6xl font-bold">6</h2>
              <p className="text-sm font-sans w-[400px]">
                Download code as a zip file: Provides the ability to download
                the code from the editor as a zip file, allowing users to save a
                local copy of their projects for offline access or sharing with
                others.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <footer className="w-full max-md:pt-10 text-gray-300 h-10 flex justify-center items-center gap-1">
        Designed and developed by
        <a
          href="https://cermuel.vercel.app"
          className="text-pry underline hover:scale-105 duration-200 translate-all"
        >
          CERMUEL
        </a>
        &
        <a
          href="https://oreos.me/"
          className="text-pry underline hover:scale-105 duration-200 translate-all"
        >
          OREOS
        </a>
      </footer>
    </div>
  );
};

export default Entry;
