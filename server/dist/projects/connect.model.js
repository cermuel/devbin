"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ConnectionSchema = new Schema({
    type: { type: String, required: true, enum: ["invite", "request"] },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receipient: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });
exports.Connections = mongoose_1.default.model("Connection", ConnectionSchema);
//# sourceMappingURL=connect.model.js.map