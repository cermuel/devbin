import { IUser } from "./users.dto";
import { Users } from "./users.model";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/not-found.error";
import type { Request, Response } from "express";
import { APIResponse } from "../types";

export const showCurrentUser = async (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

export const getSingleUser = async (
	req: Request<{ id: string }, APIResponse<{ user: IUser }>>,
	res: Response<APIResponse<{user: IUser}>>
) => {
	const user = await Users.findById(req.params.id).select("-password");

	if (!user) {
		throw new NotFoundError("User not found");
	}
	return res.status(StatusCodes.OK).json({statusCode: StatusCodes.OK, data: {user}, msg: "User found" });
};

export const getAllUsers = async (
	req: Request,
	res: Response<APIResponse<{users: IUser[]}>>
) => {
	const users = await Users.find({}).select("-password");

	res.status(StatusCodes.OK).json({statusCode: StatusCodes.OK, data: {users}, msg: "All users" });
};
