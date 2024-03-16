"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = exports.inviteCollabValid = void 0;
const zod_1 = require("zod");
exports.inviteCollabValid = zod_1.z.object({
    user: zod_1.z.custom((val) => val.match(/^[0-9a-fA-F]{24}$/), "Invalid user Id")
});
exports.isValidId = zod_1.z.object({
    id: zod_1.z.custom((val) => val.match(/^[0-9a-fA-F]{24}$/), "invalid ObjectId")
});
//# sourceMappingURL=connect.dto.js.map