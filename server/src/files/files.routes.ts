import { Router, Request, Response } from "express";
import { updateFile } from "./files.controller";
import { APIParams, APIResponse } from "src/types";
import { IFile } from "./files.dto";
import { validateRequest } from "../middlewares/validate.middleware";
import { isValidId } from "../projects/connect.dto";


const router = Router();

router.route("/:id").put(validateRequest({params: isValidId}),async (req: Request<APIParams>, res: Response<APIResponse<{file: IFile}>>) => {
	const file = await updateFile(req.params.id, req.body);
	res.status(200).json({ msg:"File updated Sucessfully", data: {file}, statusCode:200 });
});





export default router;