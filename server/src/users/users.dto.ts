import * as z from 'zod';


export const UserSchemaValidation = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
    email: z.string().email(),
    role: z.enum(['admin', 'user']).optional(),
});

export type IUser  = z.infer<typeof UserSchemaValidation> & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;

}


export const LoginValidation = z.object({
    password: z.string().min(6).max(50),
    email: z.string().email(),
});