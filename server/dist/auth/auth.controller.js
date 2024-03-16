"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const CustomError = __importStar(require("../errors"));
const utils_1 = require("../utils");
const users_model_1 = require("../users/users.model");
const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    const emailAlreadyExists = await users_model_1.Users.findOne({ email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError("Email already exists");
    }
    const isFirstAccount = (await users_model_1.Users.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";
    const user = await users_model_1.Users.create({
        firstName,
        lastName,
        email,
        password,
        role,
    });
    const tokenUser = (0, utils_1.createUserToken)({ user });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ token: tokenUser });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError("Please peovide email and password");
    }
    const user = await users_model_1.Users.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    const tokenUser = (0, utils_1.createUserToken)({ user });
    res.status(http_status_codes_1.StatusCodes.OK).json({ token: tokenUser });
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map