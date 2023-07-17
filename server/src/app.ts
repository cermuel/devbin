import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { connectDB } from "./db/connect";
require("express-async-errors");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const app: Application = express();

const http = createServer(app);
const io = new Server(http, {cors: {origin: "*"}});

import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/user.routes";
import projectRoutes from "./projects/projects.routes";
import { errorHandlerMiddleware } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/not-found.middleware";
import { authenticateUser } from "./middlewares/auth";
import cors from "cors";
import socket from "./socket";

app.use(cors<Request>());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateUser, userRoutes);
app.use("/api/projects", authenticateUser, projectRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world!");
});

socket(io);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/samo");
		http.listen(port, () => {
			console.log("Example app listening on port 5000!");
		});
	} catch (error) {
		console.log(error);
	}
};

start();
