"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondToRequest = exports.respondToInvite = exports.getSentCollaborationInvites = exports.getSentCollaborationRequests = exports.getCollaborationInvites = exports.getCollaborationRequests = exports.requestCollaboration = exports.inviteCollaboration = exports.getSingleProject = exports.getAllProjects = exports.getMyProjects = exports.createProject = void 0;
const files_controller_1 = require("../files/files.controller");
const projects_model_1 = require("./projects.model");
const not_found_error_1 = require("../errors/not-found.error");
const connect_model_1 = require("./connect.model");
const errors_1 = require("../errors");
const users_model_1 = require("../users/users.model");
const createProject = async (name, files, user) => {
    const createdFiles = await (0, files_controller_1.createFiles)(files);
    const project = await projects_model_1.Projects.create({
        name,
        files: createdFiles.map((file) => file._id),
        owner: user._id,
    });
    return project;
};
exports.createProject = createProject;
const getMyProjects = async (query) => {
    const projects = await (0, exports.getAllProjects)(query);
    return projects;
};
exports.getMyProjects = getMyProjects;
const getAllProjects = async (query) => {
    let { limit, skip, page } = query;
    const { search, sort, owner } = query;
    const queryObj = {};
    if (search) {
        queryObj.name = {
            $regex: search,
            $options: "i",
        };
    }
    if (owner) {
        queryObj.owner = owner;
    }
    let result = projects_model_1.Projects.find(queryObj);
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
    const projects = await result.populate("files");
    return projects;
};
exports.getAllProjects = getAllProjects;
const getSingleProject = async (id) => {
    const project = await projects_model_1.Projects.findById(id).populate("files");
    return project;
};
exports.getSingleProject = getSingleProject;
const inviteCollaboration = async (id, receipient, sender) => {
    const project = await projects_model_1.Projects.findById(id);
    if (!project)
        throw new not_found_error_1.NotFoundError("Project not found");
    if (project.owner.toString() !==
        sender._id.toString())
        throw new errors_1.UnauthenticatedError("You are not the owner of this project");
    const user = await users_model_1.Users.findById(receipient);
    if (!user)
        throw new not_found_error_1.NotFoundError("User not found");
    const oldCon = await connect_model_1.Connections.findOne({ receipient, project: project._id });
    if (oldCon) {
        return `User ${receipient} has already been sent an invite to project ${project._id} and it is ${oldCon.status}`;
    }
    const connection = await connect_model_1.Connections.create({
        type: "invite",
        sender,
        receipient,
        project: project._id,
    });
    return "Invitation sent successfully";
};
exports.inviteCollaboration = inviteCollaboration;
const requestCollaboration = async (id, sender) => {
    const project = await projects_model_1.Projects.findById(id);
    if (!project)
        throw new not_found_error_1.NotFoundError("Project not found");
    const oldCon = await connect_model_1.Connections.findOne({ project: project._id, sender });
    if (oldCon) {
        return `You have already sent a request to project ${project._id} and it is ${oldCon.status}`;
    }
    const connection = await connect_model_1.Connections.create({
        type: "request",
        sender,
        receipient: project.owner,
        project: project._id,
    });
    return "Request sent successfully";
};
exports.requestCollaboration = requestCollaboration;
const getCollaborationRequests = async (user) => {
    const requests = await connect_model_1.Connections.find({
        receipient: user._id,
        type: "request",
    }).populate([{ path: "project", select: "name" }, { path: "sender", select: "firstName lastName email" }, { path: "receipient", select: "firstName lastName email" }]);
    return requests;
};
exports.getCollaborationRequests = getCollaborationRequests;
const getCollaborationInvites = async (user) => {
    const invites = await connect_model_1.Connections.find({
        receipient: user._id,
        type: "invite",
    }).populate([{ path: "project", select: "name" }, { path: "sender", select: "firstName lastName email" }, { path: "receipient", select: "firstName lastName email" }]);
    return invites;
};
exports.getCollaborationInvites = getCollaborationInvites;
const getSentCollaborationRequests = async (user) => {
    const requests = await connect_model_1.Connections.find({
        sender: user._id,
        type: "request",
    }).populate([{ path: "project", select: "name" }, { path: "sender", select: "firstName lastName email" }, { path: "receipient", select: "firstName lastName email" }]);
    return requests;
};
exports.getSentCollaborationRequests = getSentCollaborationRequests;
const getSentCollaborationInvites = async (user) => {
    const invites = await connect_model_1.Connections.find({
        sender: user._id,
        type: "invite",
    }).populate([{ path: "project", select: "name" }, { path: "sender", select: "firstName lastName email" }, { path: "receipient", select: "firstName lastName email" }]);
    return invites;
};
exports.getSentCollaborationInvites = getSentCollaborationInvites;
const respondToInvite = async (id, response, user) => {
    const connection = await connect_model_1.Connections.findById(id);
    if (!connection)
        throw new not_found_error_1.NotFoundError("Connection not found");
    const project = await projects_model_1.Projects.findById(connection.project);
    if (!project)
        throw new not_found_error_1.NotFoundError("Project not found");
    if (connection.receipient.toString() !==
        user._id.toString())
        throw new Error("You are not the receipient of this connection");
    if (response === "accepted") {
        project.collaborators.push(connection.receipient);
        await project.save();
    }
    connection.status = response;
    await connection.save();
    return "Response sent successfully";
};
exports.respondToInvite = respondToInvite;
const respondToRequest = async (id, response, user) => {
    const connection = await connect_model_1.Connections.findById(id);
    if (!connection)
        throw new not_found_error_1.NotFoundError("Connection not found");
    const project = await projects_model_1.Projects.findById(connection.project);
    if (!project)
        throw new not_found_error_1.NotFoundError("Project not found");
    if (connection.receipient.toString() !==
        user._id.toString())
        throw new Error("You are not the receipient of this connection");
    if (response === "accepted") {
        project.collaborators.push(connection.sender);
        await project.save();
    }
    connection.status = response;
    await connection.save();
    return "Response sent successfully";
};
exports.respondToRequest = respondToRequest;
//# sourceMappingURL=projects.controller.js.map