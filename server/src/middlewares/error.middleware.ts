import { CustomAPIError } from "../errors";

const { StatusCodes } = require('http-status-codes');
export const errorHandlerMiddleware = (err: CustomAPIError, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };
  
  
  return res.status(customError.statusCode).json({ msg: customError.message, statusCode: customError.statusCode });
};

