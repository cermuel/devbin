import { User } from "../users/users.model";
import { CustomAPIError } from "../errors/custom.error";
import { isTokenValid } from "../utils/jwt";
import type { Request, Response, NextFunction } from "express";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  try {
    if (token) {
      const payload = isTokenValid(token);
      const user = await User.findById(payload.sub).select("-password");

      if (user) {
        req.user = user;

        return next();
      }
    }
    throw new CustomAPIError("Unauthorized", 401);
  } catch (e) {
    throw e;
  }
};
