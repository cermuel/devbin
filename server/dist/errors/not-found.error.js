"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom.error");
const http_status_codes_1 = require("http-status-codes");
class NotFoundError extends custom_error_1.CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found.error.js.map