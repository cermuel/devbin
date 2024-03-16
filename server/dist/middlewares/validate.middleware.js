"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const CustomError = __importStar(require("../errors/"));
function validateRequest(validators) {
    return async (req, res, next) => {
        try {
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                throw new CustomError.CustomAPIError(error.message, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
            }
            throw new CustomError.BadRequestError(error.message);
        }
    };
}
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate.middleware.js.map