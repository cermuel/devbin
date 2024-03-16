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
import { APIQuery } from "../types";
import { connectStatus } from "./projects.dto";
export declare const createProject: (name: string, files: unknown[], user: any) => Promise<import("mongoose").Document<unknown, {}, import("./projects.dto").IProject> & Omit<import("./projects.dto").IProject & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>>;
export declare const getMyProjects: (query: APIQuery) => Promise<Omit<import("mongoose").Document<unknown, {}, import("./projects.dto").IProject> & Omit<import("./projects.dto").IProject & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>, never>[]>;
export declare const getAllProjects: (query: APIQuery) => Promise<Omit<import("mongoose").Document<unknown, {}, import("./projects.dto").IProject> & Omit<import("./projects.dto").IProject & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>, never>[]>;
export declare const getSingleProject: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./projects.dto").IProject> & Omit<import("./projects.dto").IProject & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>>;
export declare const inviteCollaboration: (id: string, receipient: any, sender: any) => Promise<string>;
export declare const requestCollaboration: (id: string, sender: any) => Promise<string>;
export declare const getCollaborationRequests: (user: any) => Promise<Omit<import("mongoose").Document<unknown, {}, import("./projects.dto").IConnection> & Omit<import("./projects.dto").IConnection & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>, never>[]>;
export declare const getCollaborationInvites: (user: any) => Promise<Omit<import("mongoose").Document<unknown, {}, import("./projects.dto").IConnection> & Omit<import("./projects.dto").IConnection & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>, never>[]>;
export declare const getSentCollaborationRequests: (user: any) => Promise<Omit<import("mongoose").Document<unknown, {}, import("./projects.dto").IConnection> & Omit<import("./projects.dto").IConnection & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>, never>[]>;
export declare const getSentCollaborationInvites: (user: any) => Promise<Omit<import("mongoose").Document<unknown, {}, import("./projects.dto").IConnection> & Omit<import("./projects.dto").IConnection & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>, never>[]>;
export declare const respondToInvite: (id: string, response: connectStatus, user: any) => Promise<string>;
export declare const respondToRequest: (id: string, response: connectStatus, user: any) => Promise<string>;
