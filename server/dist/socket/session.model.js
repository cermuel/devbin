"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessions = void 0;
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    connected: { type: Boolean, default: true },
    ttl: { type: Date, default: Date.now, expires: 86400 },
}, { timestamps: true });
exports.Sessions = (0, mongoose_1.model)("Session", SessionSchema);
//# sourceMappingURL=session.model.js.map