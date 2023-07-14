import React, { useState } from "react";
//@ts-ignore
import userLogo from "../../../assets/main.jpeg";
import { RiDownload2Line, RiSave2Fill } from "react-icons/ri";
import Settings from "./Settings";
import Dropdown from "./Dropdown";
import { IoMdSearch } from "react-icons/io";
import { Toaster } from "react-hot-toast";
const NavTwo = ({
  onChange,
  show,
}: {
  onChange?: (e: any) => void;
  show?: string;
}) => {
  const [showSettings, setshowSettings] = useState<boolean>(false);
  const [showDropDown, setshowDropDown] = useState<boolean>(false);
  return (
    <>
      {showSettings && <Settings setshowSettings={setshowSettings} />}
      {showDropDown && <Dropdown setshowSettings={setshowSettings} />}
      <nav className="h-[7vh] p-2 w-full border-b-[1px] gap-3 border-b-[#1e1e1e] bg-[#101010] flex justify-between">
        <Toaster />
        <div></div>
        {show ? null : (
          <div className="bg-gray-700 px-4 flex-grow flex items-center">
            <IoMdSearch className="text-2xl text-gray-300" />
            <input
              onChange={onChange}
              type="text"
              className="flex-grow h-full text-lg font-medium px-4 bg-transparent text-gray-300 outline-none"
              placeholder="Search DevBIN..."
            />
          </div>
        )}
        <button
          onClick={() => setshowDropDown(!showDropDown)}
          className="h-full"
        >
          <img src={userLogo} className="h-8 w-8 rounded-sm" alt="" />
        </button>
      </nav>
    </>
  );
};

export default NavTwo;
