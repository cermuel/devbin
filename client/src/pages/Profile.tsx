import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTwo from "../components/shared/code/NavTwo";
import { isAuth } from "../utils/CodeUtils";
//@ts-ignore
import userIMG from "../assets/main.jpeg";
import {
  InvitesSent,
  getMyProjects,
  projectRequests,
} from "../functions/project";
import Projects from "../components/shared/code/Projects";
import Loading from "../components/shared/code/Loading";
import Request from "../components/profile/Request";
import RequestHeader from "../components/profile/RequestHeader";
import InvitesHeader from "../components/profile/InvitesHeader";
import Invite from "../components/profile/Invite";

const Profile = () => {
  const navigate = useNavigate();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [projects, setProjects] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [requests, setRequests] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);

  let filteredProjects = projects.filter((project: any) => {
    return project.name.toLowerCase().includes(query.toLowerCase());
  });

  useLayoutEffect(() => {
    isAuth(navigate);
    setUserLoading(true);
    let user: any = localStorage.getItem("devbin_user");
    if (user !== null || undefined) {
      user = JSON.parse(user);
      setUserLoading(false);
      setUser(user);
    }
    getMyProjects({ setLoading: setProjectsLoading, setProjects });
    projectRequests({ setRequests });
    InvitesSent({ setInvites });
  }, []);

  const [active, setActive] = useState("My Projects");
  const tabs = ["My Projects", "Project Requests", "Invites Received"];

  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      {(userLoading || projectsLoading) && <Loading />}
      <NavTwo onChange={(e: any) => setQuery(e.target.value)} />
      <section className="h-[30%] relative sm:justify-center flex gap-2 items-center px-4 max-sm:h-[15%] w-full bg-black">
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
      <section className="h-[68%] relative w-full bg-black border-t-[1px] border-t-gray-800 sm:pb-14 p-4 max-sm:h-[75%]">
        <div className="flex">
          {tabs.map((tab: string) => {
            return (
              <h1
                onClick={() => setActive(tab)}
                className={`lg:text-5xl md:text-3xl sm:text-2xl cursor-pointer mb-4 sm:pt-10 text-sm font-bold text-white w-[33%] text-center ${
                  active === tab && "underline"
                } `}
              >
                {tab}
              </h1>
            );
          })}
        </div>
        <section className="flex-grow max-h-[92%] gap-8 flex flex-wrap w-full justify-around p-4 px-6 overflow-scroll">
          {active === tabs[0] ? (
            projects && projects?.length > 0 ? (
              filteredProjects.length > 0 ? (
                filteredProjects?.map((project: any, i: number) => {
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
            )
          ) : active === tabs[1] ? (
            requests.length > 0 ? (
              <>
                <div className="w-full">
                  <RequestHeader />
                  {requests.map((request: any) => {
                    return <Request request={request} />;
                  })}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex-col flex justify-center items-center">
                <p className="text-2xl font-bold mb-1 text-white">
                  You have 0 Requests
                </p>
              </div>
            )
          ) : (
            <>
              {invites.length > 0 ? (
                <>
                  <div className="w-full">
                    <InvitesHeader />
                    {invites.map((invite: any) => (
                      <Invite invite={invite} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex-col flex justify-center items-center">
                  <p className="text-2xl font-bold mb-1 text-white">
                    You Have Sent 0 Invites
                  </p>
                  <button
                    onClick={() => setActive(tabs[0])}
                    className="bg-[#737cde] text-white px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Go To Projects
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default Profile;
