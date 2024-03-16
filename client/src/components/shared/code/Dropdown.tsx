import React, { Dispatch } from "react";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../../functions/auth";

const Dropdown = ({
  setshowSettings,
}: {
  setshowSettings: Dispatch<boolean>;
}) => {
  let navigate = useNavigate();
  return (
    <>
      <section className="fixed right-2 z-50 top-[7vh] w-40 h-56 bg-gray-700 py-2 rounded-sm">
        <Link to={"/code/home"}>
          <button className="py-1 text-sm h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left">
            Home
          </button>
        </Link>
        <Link to={"/code/profile/me"}>
          <button className="py-1 text-sm h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left">
            Profile
          </button>
        </Link>
        <div className="h-[1px] my-1 w-full bg-gray-500"></div>
        <button
          onClick={() => {
            navigate("/code/bin/new");
          }}
          className="py-1 text-sm h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left"
        >
          New Bin
        </button>
        <div className="h-[1px] my-1 w-full bg-gray-500"></div>{" "}
        <button
          className="py-1 text-sm gap-1 flex items-center h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left"
          onClick={() => setshowSettings(true)}
        >
          <IoIosSettings className="text-xl" /> Settings
        </button>
        <button
          onClick={() => Logout(navigate)}
          className="py-1 text-sm gap-1 flex items-center h-8 my-[2px] px-2 hover:bg-pry font-semibold text-white w-full text-left"
        >
          <IoIosLogOut className="text-xl" /> Logout
        </button>
      </section>{" "}
    </>
  );
};

export default Dropdown;
