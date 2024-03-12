import React from "react";

const Offline = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl mb-2">Please Go Online To Continue</h1>
      <button
        onClick={() => window.location.reload()}
        className="bg-[#737cde] text-white px-4 py-2 text-sm font-medium rounded-sm"
      >
        Retry
      </button>
    </div>
  );
};

export default Offline;
