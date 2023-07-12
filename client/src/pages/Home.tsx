import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../utils/ChatUtils";

const Home = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isAuth(navigate);
  }, []);
  return <div className="bg-pry w-screen h-screen"></div>;
};

export default Home;
