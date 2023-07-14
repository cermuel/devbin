import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import { getUser } from "../functions/user";
import { isAuth } from "../utils/ChatUtils";
//@ts-ignore
import userIMG from "../assets/main.jpeg";
import { getMyProjects } from "../functions/project";
import Projects from "../components/shared/code/Projects";
import Loading from "../components/shared/code/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [projects, setProjects] = useState<any[]>([]);
  useLayoutEffect(() => {
    isAuth(navigate);

    getUser({ setLoading: setUserLoading, setUser });
    getMyProjects({ setLoading: setProjectsLoading, setProjects });
  }, []);
  console.log(projects);
  return (
    <main className="w-screen h-screen bg-gray-700">
      {(userLoading || projectsLoading) && <Loading />}
      <NavTwo />
      <section className="h-[30%] relative sm:justify-center flex gap-2 items-center px-4 max-sm:h-[15%] w-full bg-gray-600">
        <img
          src={userIMG}
          className="w-16 z-30 sm:absolute sm:w-24 bottom-[-20%]"
          alt=""
        />
        <div className="flex flex-col sm:text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-200 sm:text-xl">{user?.email}</p>
        </div>
      </section>
      <section className="h-[68%] relative w-full bg-gray-700 p-4 max-sm:h-[75%]">
        <h1 className="sm:text-5xl sm:pt-10 text-3xl font-bold text-white">
          My Projects
        </h1>
        <section className="flex-grow max-h-[92%] gap-8 flex flex-wrap w-full justify-around p-4 px-6 overflow-scroll">
          {projects &&
            projects.length > 0 &&
            projects?.map((project: any, i: number) => {
              return (
                // <Projects
                //   html={project.files[0]}
                //   css={project.files[1]}
                //   js={project.files[2]}
                //   key={i}
                // />
                <div></div>
              );
            })}
        </section>
      </section>
    </main>
  );
};

export default Profile;
