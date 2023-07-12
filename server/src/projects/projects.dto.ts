import { Types } from "mongoose";
import { z } from "zod";

export const ProjectSchemaValidator = z.object({
	name: z.string().min(2).max(50),
	files: z.array(z.any()),
});

export interface IProject extends z.infer<typeof ProjectSchemaValidator> {
    files: Types.ObjectId[];
    owner: Types.ObjectId;
    collaborators?: Types.ObjectId[];
    _id?: Types.ObjectId;
}