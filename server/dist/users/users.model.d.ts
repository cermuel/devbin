import mongoose from "mongoose";
import { IUser } from "./users.dto";
export declare const Users: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & Omit<{
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    role?: "user" | "admin";
} & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    _id?: mongoose.Types.ObjectId;
} & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>;
