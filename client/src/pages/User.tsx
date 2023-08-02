import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser } from "../functions/user";
//@ts-ignore
import userIMG from "../assets/main.jpeg";
import { isAuth } from "../utils/CodeUtils";
import Loading from "../components/shared/code/Loading";
import NavTwo from "../components/shared/code/NavTwo";
import Projects from "../components/shared/code/Projects";
import { getAllProjects } from "../functions/project";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userLoading, setUserLoading] = React.useState<boolean>(false);
  const [projectsLoading, setProjectsLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>();
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useLayoutEffect(() => {
    isAuth(navigate);
    if (id) {
      getSingleUser({ setLoading: setUserLoading, setUser, id });
      getAllProjects({ setLoading: setProjectsLoading, setProjects });
    }
  }, []);

  const filteredProjects = projects?.filter((project: any) => {
    return project?.owner === user?._id;
  });

  return (
    <main className="w-screen h-screen overflow-hidden bg-gray-700">
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
      <section className="h-[68%] relative w-full bg-gray-700 sm:pb-14 p-4 max-sm:h-[75%]">
        <h1 className="sm:text-5xl mb-4 sm:pt-10 text-3xl font-bold text-white">
          My Projects
        </h1>
        <section className="flex-grow max-h-[92%] gap-6 flex flex-wrap w-full justify-around p-4 px-6 overflow-scroll">
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects?.map((project: any, i: number) => {
              return (
                <Projects
                  //   owner={project.owner}
                  html={project.files[0].text}
                  css={project.files[1].text}
                  js={project.files[2].text}
                  key={i}
                  projectName={project.name}
                  id={project._id}
                />
              );
            })
          ) : (
            <div className="w-full h-full flex-col flex justify-center items-center">
              <p className="text-2xl font-bold mb-1 text-white">
                {" "}
                You have 0 projects
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    navigate("/code/bin/new");
                  }}
                  className="bg-pry text-white rounded-sm py-2 px-6"
                >
                  Create One
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default User;
