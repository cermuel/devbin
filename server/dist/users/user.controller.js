"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getSingleUser = exports.showCurrentUser = void 0;
const users_model_1 = require("./users.model");
const http_status_codes_1 = require("http-status-codes");
const not_found_error_1 = require("../errors/not-found.error");
const showCurrentUser = async (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.showCurrentUser = showCurrentUser;
const getSingleUser = async (req, res) => {
    const user = await users_model_1.Users.findById(req.params.id).select("-password");
    if (!user) {
        throw new not_found_error_1.NotFoundError("User not found");
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ statusCode: http_status_codes_1.StatusCodes.OK, data: { user }, msg: "User found" });
};
exports.getSingleUser = getSingleUser;
const getAllUsers = async (req, res) => {
    const users = await users_model_1.Users.find({}).select("-password");
    res.status(http_status_codes_1.StatusCodes.OK).json({ statusCode: http_status_codes_1.StatusCodes.OK, data: { users }, msg: "All users" });
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.controller.js.map