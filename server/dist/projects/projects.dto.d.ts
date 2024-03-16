import { Types } from "mongoose";
import { z } from "zod";
export declare const ProjectSchemaValidator: z.ZodObject<{
    name: z.ZodString;
    files: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    name?: string;
    files?: any[];
}, {
    name?: string;
    files?: any[];
}>;
export declare const ConnectionSchemaValidator: z.ZodObject<{
    type: z.ZodEnum<["invite", "request"]>;
    status: z.ZodEnum<["pending", "accepted", "rejected"]>;
}, "strip", z.ZodTypeAny, {
    type?: "invite" | "request";
    status?: "pending" | "accepted" | "rejected";
}, {
    type?: "invite" | "request";
    status?: "pending" | "accepted" | "rejected";
}>;
export interface IProject extends z.infer<typeof ProjectSchemaValidator> {
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
