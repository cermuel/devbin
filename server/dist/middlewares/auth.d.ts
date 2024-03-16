import type { Request, Response, NextFunction } from "express";
import type { MySocket } from "../types";
export declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const authenticateUserSocket: (socket: MySocket, next: (err?: any) => void) => Promise<void>;
