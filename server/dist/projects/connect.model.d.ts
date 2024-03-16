import mongoose from "mongoose";
import { IConnection } from "./projects.dto";
export declare const Connections: mongoose.Model<IConnection, {}, {}, {}, mongoose.Document<unknown, {}, IConnection> & Omit<IConnection & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>;
