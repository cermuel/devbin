import { Router, Request, Response } from "express";
import { updateFile } from "./files.controller";
import { APIParams, APIResponse } from "src/types";
import { IFile } from "./files.dto";


const router = Router();

router.route("/:id").put(async (req: Request<APIParams>, res: Response<APIResponse<{file: IFile}>>) => {
	const file = await updateFile(req.params.id, req.body);
	res.status(200).json({ msg:"File updated Sucessfully", data: {file}, statusCode:200 });
});





export default router;