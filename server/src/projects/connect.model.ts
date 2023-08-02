import mongoose from "mongoose";
const { Schema } = mongoose;
import { IConnection } from "./projects.dto";

const ConnectionSchema = new Schema<IConnection>({
    type: { type: String, required: true, enum: ["invite", "request"] },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receipient: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });

export const Connections = mongoose.model<IConnection>("Connection", ConnectionSchema);