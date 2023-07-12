import { Types } from "mongoose";
import {z} from "zod";

export const FileSchemaValidator = z.object({
	name: z.string().min(2).max(50),
	text: z.string(),
});

export interface IFile extends z.infer<typeof FileSchemaValidator> {
    _id?: Types.ObjectId;
}