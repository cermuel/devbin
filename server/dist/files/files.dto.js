"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchemaValidator = void 0;
const zod_1 = require("zod");
exports.FileSchemaValidator = zod_1.z.object({
    type: zod_1.z.enum(["html", "css", "js"]),
    text: zod_1.z.string(),
});
//# sourceMappingURL=files.dto.js.map