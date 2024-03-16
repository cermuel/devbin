"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserSocket = exports.authenticateUser = void 0;
const users_model_1 = require("../users/users.model");
const custom_error_1 = require("../errors/custom.error");
const jwt_1 = require("../utils/jwt");
const session_model_1 = require("../socket/session.model");
const authenticateUser = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        try {
            const payload = (0, jwt_1.isTokenValid)(token);
            const user = await users_model_1.Users.findById(payload.sub).select("-password");
            if (user) {
                req.user = user;
                return next();
            }
        }
        catch (error) {
            throw new custom_error_1.CustomAPIError("Unauthorized", 401);
        }
    }
    throw new custom_error_1.CustomAPIError("Unauthorized", 401);
};
exports.authenticateUser = authenticateUser;
const authenticateUserSocket = async (socket, next) => {
    console.log(socket.handshake);
    const sessionId = socket.handshake.auth.sessionId ||
        socket.handshake.headers
            .sessionId;
    console.log("sessionId", sessionId);
    if (sessionId) {
        const session = await session_model_1.Sessions.findById(sessionId);
        if (session) {
            socket.sessionId =
                sessionId;
            socket.userId = session.userId;
            socket.user =
                await users_model_1.Users.findById(session.userId).select("-password");
            return next();
        }
    }
    const token = socket.handshake.auth.token ||
        socket.handshake.headers.token;
    if (token) {
        try {
            const payload = (0, jwt_1.isTokenValid)(token);
            const user = await users_model_1.Users.findById(payload.sub).select("-password");
            if (user) {
                socket.user = user;
                const session = await session_model_1.Sessions.create({
                    userId: payload.sub,
                    connected: true,
                });
                socket.sessionId =
                    session._id.toString();
                socket.userId =
                    user._id.toString();
                return next();
            }
        }
        catch (error) {
            next(new custom_error_1.CustomAPIError("Unauthorized", 401));
        }
    }
    next(new custom_error_1.CustomAPIError("Unauthorized", 401));
};
exports.authenticateUserSocket = authenticateUserSocket;
//# sourceMappingURL=auth.js.map