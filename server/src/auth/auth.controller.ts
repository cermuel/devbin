import { StatusCodes } from "http-status-codes";
import * as CustomError from "../errors";
import { createUserToken } from "../utils";
import { Users } from "../users/users.model";
import type { Request, Response } from "express";

export const register = async (
	req: Request,
	res: Response<{ token: string }>
) => {
	const { email, firstName, lastName, password } = req.body;

	const emailAlreadyExists = await Users.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError("Email already exists");
	}

	// TODO: change
	// first registered user is an admin
	const isFirstAccount = (await Users.countDocuments({})) === 0;
	const role = isFirstAccount ? "admin" : "user";

	const user = await Users.create({
		firstName,
		lastName,
		email,
		password,
		role,
	});
	const tokenUser = createUserToken({ user });

	res.status(StatusCodes.CREATED).json({ token: tokenUser });
};

export const login = async (req: Request, res: Response<{ token: string }>) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError.BadRequestError("Please peovide email and password");
	}
	const user = await Users.findOne({ email });
	if (!user) {
		throw new CustomError.UnauthenticatedError("Invalid Credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError("Invalid credentials");
	}
	const tokenUser = createUserToken({ user });

	res.status(StatusCodes.OK).json({ token: tokenUser });
};
