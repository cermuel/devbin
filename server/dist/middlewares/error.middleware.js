"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong try again later',
    };
    return res.status(customError.statusCode).json({ msg: customError.message, statusCode: customError.statusCode });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error.middleware.js.map