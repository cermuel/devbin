import { Types } from "mongoose";
import {z} from "zod";

export const FileSchemaValidator = z.object({
	type: z.enum(["html", "css", "js"]),
	text: z.string(),
});

export interface IFile extends z.infer<typeof FileSchemaValidator> {
    _id?: Types.ObjectId;
}