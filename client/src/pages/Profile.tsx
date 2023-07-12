import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import { getUser } from "../functions/user";
import { isAuth } from "../utils/ChatUtils";

const Profile = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isAuth(navigate);

    getUser();
  }, []);
  return (
    <main className="w-screen h-screen">
      <NavTwo />
      <section className="h-[30%] w-full bg-gray-500"></section>
    </main>
  );
};

export default Profile;
