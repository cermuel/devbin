import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  //   const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl mb-2">Page Not Found 😕</h1>
      <button
        onClick={() => (window.location.pathname = "/")}
        className="bg-[#737cde] text-white px-4 py-2 text-sm font-medium rounded-sm"
      >
        Go Home 🏠
      </button>
    </div>
  );
};

export default PageNotFound;
