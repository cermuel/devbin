import { APIResponse, Request, Response } from "../types";

export const notFound = (req: Request, res: Response<APIResponse>) => res.status(404).json({ msg: "Not Found", statusCode: 404 });
