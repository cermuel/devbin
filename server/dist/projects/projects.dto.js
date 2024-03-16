"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionSchemaValidator = exports.ProjectSchemaValidator = void 0;
const zod_1 = require("zod");
exports.ProjectSchemaValidator = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50),
    files: zod_1.z.array(zod_1.z.any()),
});
exports.ConnectionSchemaValidator = zod_1.z.object({
    type: zod_1.z.enum(["invite", "request"]),
    status: zod_1.z.enum(["pending", "accepted", "rejected"]),
});
//# sourceMappingURL=projects.dto.js.map