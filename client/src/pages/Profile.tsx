import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import { getUser } from "../functions/user";
import { isAuth } from "../utils/ChatUtils";
//@ts-ignore
import userIMG from "../assets/main.jpeg";

const Profile = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isAuth(navigate);

    getUser();
  }, []);
  let user = {
    email: "demouser@mail.com",
    firstName: "Demo",
    lastName: "User",
    role: "admin",
    __v: 0,
    _id: "64ae7f93c1a63bfd48618459",
  };

  return (
    <main className="w-screen h-screen bg-gray-700">
      <NavTwo />
      <section className="h-[30%] relative sm:justify-center flex gap-2 items-center px-4 max-sm:h-[15%] w-full bg-gray-600">
        <img
          src={userIMG}
          className="w-16 z-30 sm:absolute sm:w-24 bottom-[-20%]"
          alt=""
        />
        <div className="flex flex-col sm:text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-200 sm:text-xl">{user.email}</p>
        </div>
      </section>
      <section className="h-[68%] relative w-full bg-gray-700 p-4 max-sm:h-[75%]">
        <h1 className="sm:text-5xl sm:pt-10 text-3xl font-bold text-white">
          My Projects
        </h1>
      </section>
    </main>
  );
};

export default Profile;
