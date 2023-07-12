import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Entry = () => {
  let isAuth = localStorage.getItem("devbin_token");
  let navigate = useNavigate();
  useLayoutEffect(() => {
    if (isAuth) {
      navigate("code/home");
      window.location.reload();
    }
  }, []);
  return (
    <div className="bg-pry flex-col px-4 flex justify-center items-center w-screen h-screen">
      <h1 className="text-white text-center font-bold text-xl mb-4 sm:text-3xl">
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
