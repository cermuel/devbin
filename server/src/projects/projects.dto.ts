import { Types , Document} from "mongoose";
import { z } from "zod";

export const ProjectSchemaValidator = z.object({
	name: z.string().min(2).max(50),
	files: z.array(z.any()),
});

export const ConnectionSchemaValidator = z.object({
    type: z.enum(["invite", "request"]),
    status: z.enum(["pending", "accepted", "rejected"]),

})

export interface IProject extends z.infer<typeof ProjectSchemaValidator>{
    files: Types.ObjectId[];
    owner: Types.ObjectId;
    collaborators?: Types.ObjectId[];
    _id?: Types.ObjectId;
}

export interface IConnection extends z.infer<typeof ConnectionSchemaValidator> {
    sender: Types.ObjectId;
    receipient: Types.ObjectId;
    _id?: Types.ObjectId;
    project: Types.ObjectId;

}

export type connectStatus = z.infer<typeof ConnectionSchemaValidator>["status"];