import { APIQuery } from "../types";
import { createFiles } from "../files/files.controller";
import { Projects } from "./projects.model";
import { NotFoundError } from "../errors/not-found.error";
import { Connections } from "./connect.model";
import { connectStatus } from "./projects.dto";
import { UnauthenticatedError } from "../errors";
import { Users } from "../users/users.model";

export const createProject = async (
  name: string,
  files: unknown[],
  user,
) => {
  const createdFiles =
    await createFiles(files);
  const project = await Projects.create(
    {
      name,
      files: createdFiles.map(
        (file) => file._id,
      ),
      owner: user._id,
    },
  );
  return project;
};

export const getMyProjects = async (
  query: APIQuery,
) => {
  const projects = await getAllProjects(
    query,
  );
  return projects;
};

export const getAllProjects = async (
  query: APIQuery,
) => {
  let { limit, skip, page } = query;

  const { search, sort, owner } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryObj: any = {};
  if (search) {
    queryObj.name = {
      $regex: search,
      $options: "i",
    };
  }
  if (owner) {
    queryObj.owner = owner;
  }

  let result = Projects.find(queryObj);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  page = Number(page) || 1;
  limit = Number(limit) || 10;
  skip = (page - 1) * limit;

  result = result
    .skip(skip)
    .limit(limit);

  const projects =
    await result.populate("files");
  return projects;
};

export const getSingleProject = async (
  id: string,
) => {
  const project =
    await Projects.findById(
      id,
    ).populate("files");
  return project;
};

export const inviteCollaboration =
  async (
    id: string,
    receipient,
    sender,
  ) => {
    const project =
      await Projects.findById(id);

    if (!project)
      throw new NotFoundError(
        "Project not found",
      );

    if (
      project.owner.toString() !==
      sender._id.toString()
    )
      throw new UnauthenticatedError(
        "You are not the owner of this project",
      );

      const user = await Users.findById(receipient)

      if (!user)
        throw new NotFoundError("User not found")

      const oldCon = await Connections.findOne({receipient, project: project._id})
      if (oldCon){
        return `User ${receipient} has already been sent an invite to project ${project._id} and it is ${oldCon.status}`
      }  

    // create connection
    const connection =
      await Connections.create({
        type: "invite",
        sender,
        receipient,
        project: project._id,
      });

    // TODO: send email

    return "Invitation sent successfully";
  };

export const requestCollaboration =
  async (id: string, sender) => {
    const project =
      await Projects.findById(id);

    if (!project)
      throw new NotFoundError(
        "Project not found",
      );

      const oldCon = await Connections.findOne({project: project._id, sender})
      if (oldCon){
        return `You have already sent a request to project ${project._id} and it is ${oldCon.status}`
      }

    // create connection
    const connection =
      await Connections.create({
        type: "request",
        sender,
        receipient: project.owner,
        project: project._id,
      });

    // TODO: send email

    return "Request sent successfully";
  };

export const getCollaborationRequests =
  async (user) => {
    const requests =
      await Connections.find({
        receipient: user._id,
        type: "request",
      }).populate("sender", "project");
    return requests;
  };

export const getCollaborationInvites =
  async (user) => {
    const invites =
      await Connections.find({
        receipient: user._id,
        type: "invite",
      }).populate("sender", "project");
    return invites;
  };

export const respondToInvite = async (
  id: string,
  response: connectStatus,
  userId,
) => {
  const connection =
    await Connections.findById(id);

  if (!connection)
    throw new NotFoundError(
      "Connection not found",
    );

  const project =
    await Projects.findById(
      connection.project,
    );

  if (!project)
    throw new NotFoundError(
      "Project not found",
    );

  if (
    connection.receipient.toString() !==
    userId.toString()
  )
    throw new Error(
      "You are not the receipient of this connection",
    );

  if (response === "accepted") {
    project.collaborators.push(
      connection.receipient,
    );
    await project.save();
  }

  connection.status = response;
  await connection.save();

  return "Response sent successfully";
};

export const respondToRequest = async (
  id: string,
  response: connectStatus,
  userId,
) => {
  const connection =
    await Connections.findById(id);

  if (!connection)
    throw new NotFoundError(
      "Connection not found",
    );

  const project =
    await Projects.findById(
      connection.project,
    );

  if (!project)
    throw new NotFoundError(
      "Project not found",
    );

  if (
    connection.receipient.toString() !==
    userId.toString()
  )
    throw new Error(
      "You are not the receipient of this connection",
    );

  if (response === "accepted") {
    project.collaborators.push(
      connection.sender,
    );
    await project.save();
  }

  connection.status = response;
  await connection.save();

  return "Response sent successfully";
};
