import { Types } from "mongoose";
import * as z from "zod";
export declare const UserSchemaValidation: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["admin", "user"]>>;
}, "strip", z.ZodTypeAny, {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    role?: "user" | "admin";
}, {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    role?: "user" | "admin";
}>;
export type IUser = z.infer<typeof UserSchemaValidation> & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    _id?: Types.ObjectId;
};
export declare const LoginValidation: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password?: string;
    email?: string;
}, {
    password?: string;
    email?: string;
}>;
