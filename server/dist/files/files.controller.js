"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFileContent = exports.updateFile = exports.createFiles = exports.createFile = void 0;
const files_model_1 = require("./files.model");
const files_dto_1 = require("./files.dto");
const errors_1 = require("../errors");
const createFile = async (file) => {
    validateFile(file);
    const createdFile = await files_model_1.Files.create(file);
    return createdFile;
};
exports.createFile = createFile;
const createFiles = async (files) => {
    for (const file of files) {
        validateFile(file);
    }
    const createdFiles = await files_model_1.Files.create(files);
    return createdFiles;
};
exports.createFiles = createFiles;
const validateFile = (file) => {
    const result = files_dto_1.FileSchemaValidator.safeParse(file);
    if (result.success === false) {
        throw new errors_1.BadRequestError("Invalid file");
    }
    return "valid";
};
const updateFile = async (id, file) => {
    validateFile(file);
    const updatedFile = await files_model_1.Files.findByIdAndUpdate(id, file, {
        new: true,
    });
    return updatedFile;
};
exports.updateFile = updateFile;
const updateFileContent = async (id, content) => {
    const updatedFile = await files_model_1.Files.findByIdAndUpdate(id, { text: content }, {
        new: true,
    });
    return updatedFile;
};
exports.updateFileContent = updateFileContent;
//# sourceMappingURL=files.controller.js.map