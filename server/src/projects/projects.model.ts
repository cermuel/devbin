import mongoose from "mongoose";
const { Schema } = mongoose;
import { IProject } from "./projects.dto";



const ProjectSchema = new Schema<IProject>({
	name: { type: String, required: true },
	files: [{ type: Schema.Types.ObjectId, ref: "File" }],
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }]
},   { timestamps: true });

export const Projects = mongoose.model<IProject>("Project", ProjectSchema);