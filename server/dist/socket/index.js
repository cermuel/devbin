"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const session_model_1 = require("./session.model");
const projects_controller_1 = require("../projects/projects.controller");
const files_controller_1 = require("../files/files.controller");
exports.default = (io) => {
    io.use(auth_1.authenticateUserSocket);
    io.on("connection", async (socket) => {
        await session_model_1.Sessions.findByIdAndUpdate(socket.sessionId, { connected: true });
        console.log("connected", socket.userId);
        socket.emit("session", {
            user: socket.user,
            sessionId: socket.sessionId,
        });
        socket.join(socket.userId);
        socket.on("disconnect", async () => {
            const matchingSockets = await io
                .in(socket.userId)
                .fetchSockets();
            const isDisconnected = matchingSockets.length ===
                0;
            if (isDisconnected) {
                socket.broadcast.emit("user disconnected", socket.userId);
                session_model_1.Sessions.findByIdAndUpdate(socket.sessionId, { connected: false });
            }
        });
        socket.on("join", async (room) => {
            if (!room.match(/^[0-9a-fA-F]{24}$/))
                return socket.emit("error", "Invalid room id");
            const project = await (0, projects_controller_1.getSingleProject)(room);
            if (!project) {
                socket.emit("error", "Project not found");
                return;
            }
            if (!project.collaborators
                .map((i) => i.toString())
                .includes(socket.userId) &&
                project.owner.toString() !==
                    socket.userId) {
                socket.emit("error", "You are not a collaborator");
                return;
            }
            socket.join(room);
            socket.emit("success", "successfully");
        });
        socket.on("save", async ({ room, content, file, }) => {
            const project = await (0, projects_controller_1.getSingleProject)(room);
            if (!project) {
                socket.emit("error", "Project not found");
                return;
            }
            console.log(project);
            if (!project.files
                .map((i) => i._id.toString())
                .includes(file)) {
                socket.emit("error", "File not found");
                return;
            }
            (0, files_controller_1.updateFileContent)(file, content);
            socket.emit("success", "File updated successfully");
        });
        socket.on("deleteText", ({ room, data, file, fileType }) => {
            const text = data.text;
            const cursorPosition = data.cursorPosition;
            const timestamp = data.timestamp;
            socket
                .to(room)
                .to(socket.userId)
                .emit("deleteText", {
                text,
                cursorPosition,
                timestamp,
                file,
                fileType
            });
        });
        socket.on("insertText", ({ room, data, file, fileType }) => {
            const text = data.text;
            const cursorPosition = data.cursorPosition;
            const timestamp = data.timestamp;
            socket
                .to(room)
                .to(socket.userId)
                .emit("insertText", {
                text,
                cursorPosition,
                timestamp,
                file,
                fileType
            });
        });
        socket.on("leave", (room) => {
            socket.leave(room);
        });
        socket.on("error", (err) => {
            console.log(err);
            socket.emit("error", err);
            socket.disconnect();
        });
    });
};
//# sourceMappingURL=index.js.map