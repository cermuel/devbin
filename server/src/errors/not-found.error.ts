import { CustomAPIError } from "./custom.error";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}