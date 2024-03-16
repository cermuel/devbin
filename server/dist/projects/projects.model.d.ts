import mongoose from "mongoose";
import { IProject } from "./projects.dto";
export declare const Projects: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject> & Omit<IProject & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>;
