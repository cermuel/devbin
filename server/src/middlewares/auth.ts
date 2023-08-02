import { Users } from "../users/users.model";
import { CustomAPIError } from "../errors/custom.error";
import { isTokenValid } from "../utils/jwt";
import type { Request, Response, NextFunction } from "express";
import type { MySocket } from "../types";
import { Sessions } from "../socket/session.model";

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers["authorization"];

	if (token) {
		try {
		const payload = isTokenValid(token);
		const user = await Users.findById(payload.sub).select("-password");

		if (user) {
			req.user = user;

			return next();
		}
		} catch (error) {
			throw new CustomAPIError("Unauthorized", 401);
		}
	}
	throw new CustomAPIError("Unauthorized", 401);

};

export const authenticateUserSocket = async (socket: MySocket, next: { (err?): void }) => {
	const sessionId = socket.handshake.auth.sessionid || socket.handshake.headers.sessionid;
	console.log("sessionId", sessionId);
	if (sessionId) {
		// find existing session
		const session = await Sessions.findById(sessionId);
		if (session) {
			socket.sessionId = sessionId as string;
			socket.userId = session.userId;
			socket.user = await Users.findById(session.userId).select("-password");
			return next();
		}
	}

	const token = socket.handshake.auth.token ||socket.handshake.headers.token;
	if (token) {
		try {
		const payload = isTokenValid(token as string);
		const user = await Users.findById(payload.sub).select("-password");


		if (user) {
			socket.user = user;
			const session = await Sessions.create(
				{ userId: payload.sub, connected: true }
			);
			socket.sessionId = session._id.toString();
			socket.userId = user._id.toString();
			return next();
		}
		} catch (error) {
			next(new CustomAPIError("Unauthorized", 401));
		}
	}
	next(new CustomAPIError("Unauthorized", 401));
};
