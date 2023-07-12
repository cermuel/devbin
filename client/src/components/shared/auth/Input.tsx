import React, { useState } from "react";
import { AuthInputType } from "../../../types/components";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const AuthInput = ({ label, type, onChange }: AuthInputType) => {
  const [show, setshow] = useState(false);
  return (
    <div className="flex flex-col flex-wrap lg:items-center px-4 w-full">
      <label
        htmlFor=""
        className="text-left w-full lg:w-[300px] text-sm font-medium text-white pb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          type={type === "password" ? (show ? "text" : "password") : type}
          className="bg-white w-full lg:w-[300px] rounded-sm outline-none p-2"
        />
        {type === "password" && (
          <button
            onClick={() => {
              setshow(!show);
            }}
            className="absolute right-4 top-[50%] translate-y-[-50%]"
          >
            {!show ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
