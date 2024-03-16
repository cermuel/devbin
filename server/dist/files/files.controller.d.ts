/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IFile } from "./files.dto";
export declare const createFile: (file: IFile) => Promise<import("mongoose").Document<unknown, {}, IFile> & Omit<IFile & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>>;
export declare const createFiles: (files: IFile[]) => Promise<(import("mongoose").Document<unknown, {}, IFile> & Omit<IFile & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>)[]>;
export declare const updateFile: (id: string, file: IFile) => Promise<import("mongoose").Document<unknown, {}, IFile> & Omit<IFile & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>>;
export declare const updateFileContent: (id: string, content: string) => Promise<import("mongoose").Document<unknown, {}, IFile> & Omit<IFile & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>>;
