import mongoose from "mongoose";
const { Schema } = mongoose;
import { IFile } from "./files.dto";

const FileSchema = new Schema<IFile>({
	name: { type: String, required: true },
	text: { type: String, required: true },    
}, { timestamps: true }
);

export const Files = mongoose.model<IFile>("File", FileSchema);