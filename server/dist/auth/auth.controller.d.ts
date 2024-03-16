import type { Request, Response } from "express";
export declare const register: (req: Request, res: Response<{
    token: string;
}>) => Promise<void>;
export declare const login: (req: Request, res: Response<{
    token: string;
}>) => Promise<void>;
