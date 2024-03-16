"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const FileSchema = new Schema({
    type: { type: String, required: true, enum: ["html", "css", "js"] },
    text: { type: String, required: true },
}, { timestamps: true });
exports.Files = mongoose_1.default.model("File", FileSchema);
//# sourceMappingURL=files.model.js.map