import mongoose from "mongoose";

export const connectDB = async (url: string) => {
	await mongoose.connect(url);
};

