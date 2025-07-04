import { StatusCodes } from "http-status-codes";

export class CustomAPIError extends Error {
    constructor(message: string, public statusCode: StatusCodes) {
      super(message)
    }
  }
  