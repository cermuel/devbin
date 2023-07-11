import React from "react";
import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="bg-pry flex-col flex justify-center items-center w-screen h-screen">
      <h1 className="text-white font-bold text-3xl">
        THIS IS THE LANDNG PAGE BUT ITS NOT READY YET
      </h1>
      <Link to={"/auth/login"}>
        <button className="bg-white rounded-sm text-pry font-semibold py-2 px-6">
          LOGIN
        </button>
      </Link>
    </div>
  );
};

export default Entry;
