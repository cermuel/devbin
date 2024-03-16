import { CustomAPIError } from "./custom.error";
export declare class UnauthenticatedError extends CustomAPIError {
    constructor(message: string);
}
