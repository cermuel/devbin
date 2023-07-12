import React, { Dispatch, useContext, useState } from "react";
//@ts-ignore
import userLogo from "../../../assets/main.jpeg";
import { RiDownload2Line, RiSave2Fill } from "react-icons/ri";
import Settings from "./Settings";
import Dropdown from "./Dropdown";
import { CodeCont } from "../../../contexts/CodeContext";
import { CodeSettingsCont } from "../../../contexts/CodeSettingsContext";
import { downloadCodeAsZip } from "../../../config/CodeLogic";

const Navbar = ({
  setShowMinScreen,
  toShow,
  showMinScreen,
}: {
  setShowMinScreen: Dispatch<string>;
  toShow: string[];
  showMinScreen: string;
}) => {
  const { HTML, CSS, JS } = useContext(CodeCont);
  const { codeName, setCodeName } = useContext(CodeSettingsCont);
  const [showSettings, setshowSettings] = useState<boolean>(false);
  const [showDropDown, setshowDropDown] = useState<boolean>(false);
  return (
    <>
      {showSettings && <Settings setshowSettings={setshowSettings} />}
      {showDropDown && <Dropdown setshowSettings={setshowSettings} />}
      <nav className="h-[7vh] p-2 w-full border-b-[1px] gap-3 border-b-[#1e1e1e] bg-[#101010] flex justify-between">
        <div className="px-2 h-full pt-1">
          <input
            type="text"
            value={codeName}
            onChange={(e: any) => setCodeName(e.target.value)}
            className="text-pry md:text-xl outline-none bg-transparent font-semibold"
          />
        </div>
        <div className="gap-3 border-b-[#1e1e1e] bg-[#101010] flex items-center">
          <button
            className="bg-pry h-full px-2 gap-2 flex text-white justify-center rounded-sm items-center"
            onClick={() => {
              // setshowSettings(true);
              alert("Save function not ready yet");
            }}
          >
            <span className="max-md:hidden">Save</span>
            <RiSave2Fill className="text-xl" />
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
        {toShow.map((t: string) => {
          const active = showMinScreen == t;
          return (
            <button
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
