"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProjectSchema = new Schema({
    name: { type: String, required: true },
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
exports.Projects = mongoose_1.default.model("Project", ProjectSchema);
//# sourceMappingURL=projects.model.js.map