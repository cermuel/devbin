import { IUser } from "./users.dto";
import type { Request, Response } from "express";
import { APIResponse } from "../types";
export declare const showCurrentUser: (req: Request, res: Response) => Promise<void>;
export declare const getSingleUser: (req: Request<{
    id: string;
}, APIResponse<{
    user: IUser;
}>>, res: Response<APIResponse<{
    user: IUser;
}>>) => Promise<Response<APIResponse<{
    user: IUser;
}>, Record<string, any>>>;
export declare const getAllUsers: (req: Request, res: Response<APIResponse<{
    users: IUser[];
}>>) => Promise<void>;
