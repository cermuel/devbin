import { Router, Request, Response } from "express";

const router = Router();


import { createProject, getMyProjects, getSingleProject } from "./projects.controller";
import { APIResponse } from "../types";
import { IProject } from "./projects.dto";
import { StatusCodes } from "http-status-codes";

router.route("/").post(async (req: Request<object, object, IProject>, res: Response<APIResponse<{project: IProject}>>) => {
	const { name, files } = req.body;

	const project = await createProject(name, files, req.user);
	res.status(StatusCodes.CREATED).json({ msg:"Project created Sucessfully", data: {project}, statusCode: StatusCodes.CREATED });
});

router.get("/my", async (req: Request, res: Response<APIResponse<{projects: IProject[]}>>) => {
	req.query.owner = req.user._id;
	const projects = await getMyProjects(req.query);
	res.status(StatusCodes.OK).
		json({ msg:"Projects fetched Sucessfully", data: {projects}, statusCode:StatusCodes.OK });

});

router.route("/:id").get(async (req: Request, res: Response<APIResponse<{project: IProject}>>) => {
	const project = await getSingleProject(req.params.id);
	res.status(StatusCodes.OK)
		.json({ msg:"Project fetched Sucessfully", data: {project}, statusCode:StatusCodes.OK });
});


export default router;