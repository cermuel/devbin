import {Files} from "./files.model";
import { FileSchemaValidator, IFile } from "./files.dto";
import { BadRequestError } from "../errors";


export const createFile = async (file: IFile) => {
	validateFile(file);

	const createdFile = await Files.create(file);
	return createdFile;
};

export const createFiles = async (files: IFile[]) => {
	for (const file of files) {
		validateFile(file);
	}
	const createdFiles = await Files.create(files);
	return createdFiles;
};

const validateFile = (file: IFile) => {
	const result = FileSchemaValidator.safeParse(file);
	if (result.success === false) {
		throw new BadRequestError("Invalid file");
	}
	return "valid";
};


export const updateFile = async (id: string, file: IFile) => {
	validateFile(file);
	const updatedFile = await Files.findByIdAndUpdate(id, file, {
		new: true,
	});
	return updatedFile;
};
