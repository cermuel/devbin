import { useNavigate } from "react-router-dom";

const Entry = () => {
  let isAuth = localStorage.getItem("devbin_token");
  let navigate = useNavigate();

  return (
    <div className="bg-black relative overflow-scroll w-screen h-screen sm:px-14 md:px-28 px-6">
      <section className="text-white h-screen relative flex gap-4 flex-col justify-center items-start">
        <nav className=" text-white top-0 absolute left-0 flex w-full justify-between items-center py-6">
          <div>
            <button>Logo</button>
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
        <h1 className="text-7xl font-bold leading-snug md:max-w-[60%]">
          The whole digital <br /> mix is in{" "}
          <span className="bg-pry tracking-wider px-2">DevBIN</span>
        </h1>
        <p className="text-xl text-gray-300 tracking-wide md:max-w-[60%]">
          Proven growth marketing squad without all the agency fluff. If you’re
          looking for a traditional marketing approach with modern solutions,
          we’re good for that.
        </p>
        <button
          onClick={() => {
            isAuth ? navigate("/code/home") : navigate("/auth/login");
          }}
          className="border-[1px] hover:text-black hover:bg-white mt-2 text-sm border-white text-white px-10 py-3"
        >
          Explore
        </button>
      </section>
      <section className="text-white h-screen relative flex max-md:flex-wrap gap-4 justify-center items-start">
        <div className="md:w-[50%] md:h-full w-full flex justify-center items-center">
          <h1 className="text-6xl font-bold text-white">
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
            <li className="border-b-white p-10 max-sm:px-0 border-b-2 w-full gap-10 flex items-center">
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
    </div>
  );
};

export default Entry;
