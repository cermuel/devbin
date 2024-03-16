import mongoose from "mongoose";
import { IFile } from "./files.dto";
export declare const Files: mongoose.Model<IFile, {}, {}, {}, mongoose.Document<unknown, {}, IFile> & Omit<IFile & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>;
