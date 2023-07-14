import { APIQuery } from "../types";
import { createFiles } from "../files/files.controller";
import { Projects } from "./projects.model";

export const createProject = async (name: string, files: unknown[], user) => {
	const createdFiles = await createFiles(files);
	const project = await Projects.create({
		name,
		files: createdFiles.map((file) => file._id),
		owner: user._id,
	});
	return project;
};

export const getMyProjects = async (query: APIQuery) => {
	const projects = await getAllProjects(query);
	return projects;
};

export const getAllProjects = async (query: APIQuery) => {
	let { limit, skip, page } = query;

	const { search, sort, owner } = query;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const queryObj: any = {};
	if (search) {
		queryObj.name = { $regex: search, $options: "i" };
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

	result = result.skip(skip).limit(limit);

	const projects = await result.populate("files");
	return projects;
};

export const getSingleProject = async (id: string) => {
	const project = await Projects.findById(id).populate("files");
	return project;
};
