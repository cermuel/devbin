import mongoose from "mongoose";
const { Schema } = mongoose;
import { IFile } from "./files.dto";

const FileSchema = new Schema<IFile>({
	type: { type: String, required: true, enum: ["html", "css", "js"] },
	text: { type: String, required: true },    
}, { timestamps: true }
);

export const Files = mongoose.model<IFile>("File", FileSchema);