import { Schema, model } from "mongoose";

interface ISession {
    userId: string;
    sessionId: string;  
    connected: boolean;
}

const SessionSchema = new Schema<ISession>({
	userId: { type: String, required: true },
	connected: { type: Boolean, default: true },
}, { timestamps: true });

export const Sessions = model<ISession>("Session", SessionSchema);