import { StatusCodes } from "http-status-codes";
export declare class CustomAPIError extends Error {
    statusCode: StatusCodes;
    constructor(message: string, statusCode: StatusCodes);
}
