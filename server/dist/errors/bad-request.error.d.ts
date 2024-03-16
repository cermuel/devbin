import { CustomAPIError } from "./custom.error";
export declare class BadRequestError extends CustomAPIError {
    constructor(message: string);
}
