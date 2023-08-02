import React, { Dispatch, useContext, useState } from "react";
//@ts-ignore
import userLogo from "../../../assets/main.jpeg";
import { RiDownload2Line, RiSave2Fill } from "react-icons/ri";
import Settings from "./Settings";
import Dropdown from "./Dropdown";
import { CodeCont } from "../../../contexts/CodeContext";
import { CodeSettingsCont } from "../../../contexts/CodeSettingsContext";
import { downloadCodeAsZip } from "../../../config/CodeLogic";
import { Toaster, toast } from "react-hot-toast";
import { updateProject } from "../../../functions/project";
import { AiOutlineLoading, AiOutlineUsergroupAdd } from "react-icons/ai";
import Collaborator from "./Collaborator";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

const Navbar = ({
  setShowMinScreen,
  toShow,
  showMinScreen,
}: {
  setShowMinScreen: Dispatch<string>;
  toShow: string[];
  showMinScreen: string;
}) => {
  const { HTML, CSS, JS, activeID, live, setLive } = useContext(CodeCont);
  const { codeName, setCodeName } = useContext(CodeSettingsCont);
  const [showSettings, setshowSettings] = useState<boolean>(false);
  const [showDropDown, setshowDropDown] = useState<boolean>(false);
  const [saveLoading, setsaveLoading] = useState<boolean>(false);
  const [showCollab, setshowCollab] = useState<boolean>(false);

  React.useEffect(() => {
    console.log(live);
  }, [live]);

  return (
    <>
      {showSettings && <Settings setshowSettings={setshowSettings} />}
      {showCollab && <Collaborator setshowCollab={setshowCollab} />}
      {showDropDown && <Dropdown setshowSettings={setshowSettings} />}
      <nav className="h-[7vh] p-2 w-full border-b-[1px] gap-3 border-b-[#1e1e1e] bg-[#101010] flex justify-between">
        <Toaster />
        <div className="px-2 h-full pt-1 flex-grow max-sm:pt-3">
          <input
            type="text"
            value={codeName}
            onChange={(e: any) => setCodeName(e.target.value)}
            className="text-pry md:text-xl outline-none bg-transparent w-full font-semibold"
          />
        </div>

        <div className="gap-3 border-b-[#1e1e1e] bg-[#101010] flex items-center">
          <button
            onClick={() => setshowCollab(true)}
            className="bg-pry h-full sm:px-4 px-2 gap-2 flex text-white justify-center rounded-sm items-center"
          >
            <AiOutlineUsergroupAdd />
          </button>
          <button
            onClick={() => {
              setLive(!live);
              live == false
                ? toast.success("You're now live")
                : toast("You've disconnected");
            }}
            className="bg-pry text-xl h-full sm:px-4 px-2 gap-2 flex text-white justify-center rounded-sm items-center"
          >
            {live ? (
              <BsToggle2On className="text-white" />
            ) : (
              <BsToggle2Off className="text-gray-300" />
            )}
          </button>
          <button
            onClick={() =>
              updateProject({
                id: activeID,
                codeName,
                setLoading: setsaveLoading,
              })
            }
            className="bg-pry max-sm:hidden h-full px-2 gap-2 flex text-white justify-center rounded-sm items-center"
          >
            {saveLoading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              <>
                <span className="max-md:hidden">Save</span>
                <RiSave2Fill className="text-xl" />
              </>
            )}
          </button>
          <button
            className="bg-pry h-full gap-2 px-2 text-white flex justify-center rounded-sm items-center"
            onClick={() => {
              downloadCodeAsZip({
                codeName,
                htmlCode: HTML,
                cssCode: CSS,
                jsCode: JS,
              });
            }}
          >
            <span className="max-md:hidden">Download</span>
            <RiDownload2Line className="text-xl" />
          </button>
          <button
            onClick={() => setshowDropDown(!showDropDown)}
            className="h-full"
          >
            <img src={userLogo} className="h-8 w-8 rounded-sm" alt="" />
          </button>
        </div>
      </nav>
      <div className="md:hidden flex gap-2 h-[4vh] bg-[#101010]">
        {toShow.map((t: string, i: number) => {
          const active = showMinScreen === t;
          return (
            <button
              key={i}
              onClick={() => setShowMinScreen(t)}
              className={`${
                active ? "bg-gray-700" : "bg-gray-800"
              } flex p-2 items-center h-full`}
            >
              <span className="text-gray-300 font-medium">
                {t !== "JAVASCRIPT" ? t : "JS"}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
