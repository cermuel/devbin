import { z } from "zod";

export const inviteCollabValid = z.object({
    user: z.custom((val: string) => val.match(/^[0-9a-fA-F]{24}$/), "Invalid user Id")
})

export const isValidId = z.object({
    id: z.custom((val: string) => val.match(/^[0-9a-fA-F]{24}$/), "invalid ObjectId")
})