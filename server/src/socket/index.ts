import type { Server } from "socket.io";
import { authenticateUserSocket } from "../middlewares/auth";
import { MySocket } from "../types";
import { Sessions } from "./session.model";
import { getSingleProject } from "../projects/projects.controller";
import { updateFileContent } from "../files/files.controller";
export default (
	io: Server,
) => {
	io.use(
		authenticateUserSocket,
	);

	io.on<"connection">(
		"connection",
		async (
			socket: MySocket,
		) => {
			await Sessions.findByIdAndUpdate(
				socket.sessionId,
				{
					connected:
            true,
				},
			);
			console.log(
				"connected",
				socket.userId,
			);

			socket.emit(
				"session",
				{
					user: socket.user,
					sessionId:
            socket.sessionId,
				},
			);

			// join the "userID" room
			socket.join(
				socket.userId,
			);

			socket.on(
				"disconnect",
				async () => {
					const matchingSockets =
            await io.in(socket.userId,).fetchSockets();
					const isDisconnected =
            matchingSockets.length ===
            0;
					if (
						isDisconnected
					) {
						// notify other users
						socket.broadcast.emit(
							"user disconnected",
							socket.userId,
						);
						// update the connection status of the session
						Sessions.findByIdAndUpdate(
							socket.sessionId,
							{
								connected:
                  false,
							},
						);
					}
				},
			);

			socket.on(
				"join",
				async (
					room,
				) => {
					// cheeck if room is a valid object id
					if (
						!room.match(
							/^[0-9a-fA-F]{24}$/,
						)
					)
						return socket.emit(
							"error",
							"Invalid room id",
						);

					const project =
            await getSingleProject(room,);
					if (
						!project
					) {
						socket.emit(
							"error",
							"Project not found",
						);
						return;
					}
					if (
						!project.collaborators
							.map(
								(
									i,
								) =>
									i.toString(),
							)
							.includes(
								socket.userId,
							) &&
            project.owner.toString() !==
            socket.userId
					) {
						socket.emit(
							"error",
							"You are not a collaborator",
						);
						return;
					}
					socket.join(
						room,
					);
					socket.emit(
						"success",
						"Joined successfully",
					);
				},
			);

			socket.on(
				"save",
				async ({
					room,
					content,
					file,
				}) => {
					// ensure that the file is part of the project

					const project =
            await getSingleProject(room,);
					if (
						!project
					) {
						socket.emit(
							"error",
							"Project not found",
						);
						return;
					}
					console.log(
						project,
					);
					if (
						!project.files
							.map(
								(
									i,
								) =>
									i._id.toString(),
							)
							.includes(
								file,
							)
					) {
						socket.emit(
							"error",
							"File not found",
						);
						return;
					}

					updateFileContent(
						file,
						content,
					);
					socket.emit(
						"success",
						"File updated successfully",
					);

				// 	socket
				// 		.to(
				// 			room,
				// 		)
				// 		.to(
				// 			socket.userId,
				// 		)
				// 		.emit(
				// 			"typing",
				// 			{
				// 				file,
				// 				content,
				// 				userId:
                //   socket.userId,
				// 			},
				// 		);
				},
			);

			socket.on("deleteText", ({room, data})=>{
				const text = data.text;
    			const cursorPosition = data.cursorPosition;
   		 		const timestamp = data.timestamp;

				socket.to(room).emit("deleteText", {text, cursorPosition, timestamp});
			})

			socket.on("insertText", ({room, data})=>{
				const text = data.text;
				const cursorPosition = data.cursorPosition;
				const timestamp = data.timestamp;

				socket.to(room).emit("insertText", {text, cursorPosition, timestamp});
			})

			socket.on(
				"leave",
				(
					room,
				) => {
					socket.leave(
						room,
					);
				},
			);

			socket.on(
				"error",
				(
					err,
				) => {
					console.log(
						err,
					);
					socket.emit(
						"error",
						err,
					);
					socket.disconnect();
				},
			);
		},
	);
};
