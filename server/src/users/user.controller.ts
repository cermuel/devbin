import { IUser } from "./users.dto";
import { User } from "./users.model";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/not-found.error";
import type { Request, Response } from "express";

export const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const getSingleUser = async (
  req: Request<{ id: string }, { user: IUser }>,
  res: Response<{ user: IUser }>
) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new NotFoundError(`User not found`);
  }
  return res.status(StatusCodes.OK).json({ user });
};

export const getAllUsers = async (
  req: Request,
  res: Response<{ users: IUser[] }>
) => {
  const users = await User.find({}).select("-password");

  res.status(StatusCodes.OK).json({ users });
};
