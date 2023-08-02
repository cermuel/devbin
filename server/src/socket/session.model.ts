import { Schema, model } from "mongoose";

interface ISession {
    userId: string;
    sessionId: string;  
    connected: boolean;
    ttl: Date;
}

const SessionSchema = new Schema<ISession>({
	userId: { type: String, required: true },
	connected: { type: Boolean, default: true },
    ttl: { type: Date, default: Date.now, expires: 86400 },
}, { timestamps: true });

export const Sessions = model<ISession>("Session", SessionSchema);