import { StatusCodes } from "http-status-codes";

export { Response, Request, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface APIResponse<Data = any> {
    msg: string;
    data?: Data;
    statusCode: StatusCodes;
}

export interface APIParams {
    id?: string;
}

export interface APIQuery {
    search?: string;
    sort?: string;
    limit?: string | number;
    skip?: string | number;
    page?: string | number;
    owner?: string;
}