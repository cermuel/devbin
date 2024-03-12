import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import Projects from "../components/shared/code/Projects";
import { isAuth } from "../utils/CodeUtils";
import { getAllProjects } from "../functions/project";
import Loading from "../components/shared/code/Loading";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  useLayoutEffect(() => {
    isAuth(navigate);
    getAllProjects({ setLoading: setProjectsLoading, setProjects });
  }, []);

  let filteredProjects = projects.filter((project: any) => {
    return project.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <main className="bg-black w-screen h-screen">
      {projectsLoading && <Loading />}

      <NavTwo onChange={(e: any) => setQuery(e.target.value)} />
      <section className="flex-grow max-h-[92%] gap-8 flex flex-wrap w-full justify-around p-4 px-6 overflow-scroll">
        {projects && projects?.length > 0 ? (
          filteredProjects.length > 0 ? (
            filteredProjects?.map((project: any, i: number) => {
              console.log(project);
              return (
                <Projects
                  owner={project.owner}
                  html={project?.files[0].text}
                  css={project?.files[1].text}
                  js={project?.files[2].text}
                  key={i}
                  projectName={project?.name}
                  id={project._id}
                />
              );
            })
          ) : (
            <div>
              <p className="text-2xl font-bold mb-1 text-white">
                Project not found
              </p>
            </div>
          )
        ) : (
          <div className="w-full h-full flex-col flex justify-center items-center">
            <p className="text-2xl font-bold mb-1 text-white">
              There are 0 projects
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
    </main>
  );
};

export default Home;
