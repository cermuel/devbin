import React from "react";
//@ts-ignore
import img from "./../../../assets/main.png";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex-col z-50 flex justify-center items-center">
      <img src={img} className="w-20 animate-pulse" alt="" />
      <h1 className="text-xl font-semibold text-pry animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
