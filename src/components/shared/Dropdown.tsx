import React, { Dispatch } from "react";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
const Dropdown = ({
  setshowSettings,
}: {
  setshowSettings: Dispatch<boolean>;
}) => {
  return (
    <section className="fixed right-2 z-20 top-[7vh] w-40 h-80 bg-gray-700 py-2 rounded-sm">
      <button className="py-1 text-sm h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left">
        Home
      </button>
      <button className="py-1 text-sm h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left">
        Profile
      </button>
      <div className="h-[1px] my-1 w-full bg-gray-500"></div>
      <button className="py-1 text-sm h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left">
        New Bin
      </button>
      <div className="h-[1px] my-1 w-full bg-gray-500"></div>{" "}
      <button
        className="py-1 text-sm gap-1 flex items-center h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left"
        onClick={() => setshowSettings(true)}
      >
        <IoIosSettings className="text-xl" /> Settings
      </button>
      <button className="py-1 text-sm gap-1 flex items-center h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left">
        <IoIosLogOut className="text-xl" /> Logout
      </button>
    </section>
  );
};

export default Dropdown;
