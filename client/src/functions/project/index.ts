import { toast } from "react-hot-toast";
import axios from "axios";
import {
  FileID,
  RespondInvite,
  projectType,
} from "../../types/functions/project";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = localStorage.getItem("devbin_token");

export const createProject = async ({
  project,
  setsaveLoading,
  navigate,
}: {
  project: projectType;
  setsaveLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  setsaveLoading(true);

  if (project.name.length > 3) {
    try {
      let createdProject = await axios.post(`${BASEURL}projects`, project, {
        headers: { Authorization: `${TOKEN}` },
      });
      setsaveLoading(false);
      toast.success("Project created successfully");

      localStorage.setItem(
        "devbin_activecode",
        createdProject.data.data.project._id
      );
      setTimeout(() => {
        navigate("/code/bin");
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setsaveLoading(false);
      console.log(err);
      let message =
        err?.response.data?.msg || err?.message || `An error occurred`;
      toast.error(message);
    }
  } else {
    toast.error("Project name must be minimum 4 characters");
    setsaveLoading(false);
  }
};

export const getProject = async ({
  id,
  setCSS,
  setHTML,
  setJS,
  setLoading,
  setCodeName,
  setFilesID,
}: {
  id: string;
  setHTML: Dispatch<string>;
  setCSS: Dispatch<string>;
  setJS: Dispatch<string>;
  setLoading: Dispatch<boolean>;
  setCodeName: Dispatch<string>;
  setFilesID: Dispatch<FileID>;
}) => {
  setLoading(true);
  try {
    let project: any = await axios.get(`${BASEURL}projects/${id}`, {
      headers: { Authorization: `${TOKEN}` },
    });
    project = project.data.data.project;
    let HTML = project?.files[0]?.text;
    let CSS = project?.files[1]?.text;
    let JS = project?.files[2]?.text;
    setFilesID({
      HTMLID: project?.files[0]?._id,
      CSSID: project?.files[1]?._id,
      JSID: project?.files[2]?._id,
    });
    setHTML(HTML);
    setCSS(CSS);
    setJS(JS);
    setCodeName(project.name);
    setLoading(false);
  } catch (err: any) {
    setLoading(false);
    console.log(err);
    let message =
      err?.response?.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};

export const getMyProjects = async ({
  setLoading,
  setProjects,
}: {
  setLoading: Dispatch<any>;
  setProjects: Dispatch<any[]>;
}) => {
  setLoading(true);
  try {
    let project = await axios.get(`${BASEURL}projects/my`, {
      headers: { Authorization: `${TOKEN}` },
    });
    setProjects(project?.data?.data?.projects);
    setLoading(false);
  } catch (err: any) {
    setLoading(false);
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};

export const getAllProjects = async ({
  setLoading,
  setProjects,
}: {
  setLoading: Dispatch<any>;
  setProjects: Dispatch<any[]>;
}) => {
  setLoading(true);
  try {
    let project = await axios.get(`${BASEURL}projects`, {
      headers: { Authorization: `${TOKEN}` },
    });
    setProjects(project?.data?.data?.projects);
    setLoading(false);
  } catch (err: any) {
    setLoading(false);
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    if (message === "Unauthorized") {
      localStorage.removeItem("devbin_token");
      window.location.pathname = "/auth/login";
    }
    toast.error(message);
  }
};

export const updateProject = async ({
  id,
  setLoading,
  codeName,
}: {
  id: string;
  codeName: string;
  setLoading: Dispatch<boolean>;
}) => {
  if (codeName.length > 3) {
    try {
      let updatedProject = await axios.patch(
        `${BASEURL}projects/${id}`,
        { name: codeName },
        {
          headers: { Authorization: `${TOKEN}` },
        }
      );
      toast.success(updatedProject.data.msg);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      let message =
        err?.response.data?.msg || err?.message || `An error occurred`;
      toast.error(message);
    }
  } else {
    toast.error(`Name must be atleast 4 letters`);
  }
};

export const Collab = async ({
  projectID,
  userId,
  setLoading,
}: {
  projectID: string;
  userId: string;
  setLoading: Dispatch<boolean>;
}) => {
  setLoading(true);
  if (projectID && userId) {
    try {
      console.log(projectID);
      let updatedProject = await axios.post(
        `${BASEURL}projects/${projectID}/invite`,
        { user: userId },
        {
          headers: { Authorization: `${TOKEN}` },
        }
      );
      toast.success(updatedProject.data.msg);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      let message =
        err?.response.data?.msg || err?.message || `An error occurred`;
      toast.error(message);
    }
  } else {
    setLoading(false);
    toast.error(`Select a project or add a user`);
  }
};

export const InvitesSent = async ({
  setInvites,
}: {
  setInvites: Dispatch<any[]>;
}) => {
  try {
    let invites = await axios.get(`${BASEURL}projects/requests`, {
      headers: { Authorization: `${TOKEN}` },
    });

    setInvites(invites?.data?.data?.requests);

    // setLoading(false);
  } catch (err: any) {
    // setLoading(false);
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};

export const projectRequests = async ({
  setRequests,
}: {
  setRequests: Dispatch<any[]>;
}) => {
  try {
    let requests = await axios.get(`${BASEURL}projects/invites`, {
      headers: { Authorization: `${TOKEN}` },
    });
    setRequests(requests?.data?.data?.requests);
  } catch (err: any) {
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};

export const acceptRequest = async ({ id }: { id: string }) => {
  try {
    let accept = await axios.post(
      `${BASEURL}projects/invite/${id}/respond`,
      { response: RespondInvite.accepted },
      {
        headers: { Authorization: `${TOKEN}` },
      }
    );
    console.log(accept.data);
    toast.success("Request Accepted");
  } catch (err: any) {
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};

export const declineRequest = async ({ id }: { id: string }) => {
  try {
    let accept = await axios.post(
      `${BASEURL}projects/invite/${id}/respond`,
      { response: RespondInvite.rejected },
      {
        headers: { Authorization: `${TOKEN}` },
      }
    );
    console.log(accept.data);
    toast.success("Request Accepted");
  } catch (err: any) {
    console.log(err);
    let message =
      err?.response.data?.msg || err?.message || `An error occurred`;
    toast.error(message);
  }
};
