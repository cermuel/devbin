import { Types } from "mongoose";
import { z } from "zod";
export declare const FileSchemaValidator: z.ZodObject<{
    type: z.ZodEnum<["html", "css", "js"]>;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type?: "html" | "css" | "js";
    text?: string;
}, {
    type?: "html" | "css" | "js";
    text?: string;
}>;
export interface IFile extends z.infer<typeof FileSchemaValidator> {
    _id?: Types.ObjectId;
}
