import { StatusCodes } from "http-status-codes";

export { Response, Request, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface APIResponse<Data = any> {
    msg: string;
    data?: Data;
    statusCode: StatusCodes;
}