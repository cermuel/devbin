import React, { useState } from "react";
//@ts-ignore
import userLogo from "../../../assets/main.jpeg";
import { RiDownload2Line, RiSave2Fill } from "react-icons/ri";
import Settings from "./Settings";
import Dropdown from "./Dropdown";
const NavTwo = () => {
  const [showSettings, setshowSettings] = useState<boolean>(false);
  const [showDropDown, setshowDropDown] = useState<boolean>(false);
  return (
    <nav className="h-[7vh] p-2 w-full border-b-[1px] gap-3 border-b-[#1e1e1e] bg-[#101010] flex justify-between">
      {showDropDown && <Dropdown setshowSettings={setshowSettings} />}
      <div></div>
      <button onClick={() => setshowDropDown(!showDropDown)} className="h-full">
        <img src={userLogo} className="h-8 w-8 rounded-sm" alt="" />
      </button>
    </nav>
  );
};

export default NavTwo;
