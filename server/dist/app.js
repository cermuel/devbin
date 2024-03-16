"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const connect_1 = require("./db/connect");
require("express-async-errors");
require("dotenv").config();
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(http, {
    cors: {
        origin: "*",
    },
});
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const user_routes_1 = __importDefault(require("./users/user.routes"));
const projects_routes_1 = __importDefault(require("./projects/projects.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const auth_1 = require("./middlewares/auth");
const cors_1 = __importDefault(require("cors"));
const socket_1 = __importDefault(require("./socket"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", auth_1.authenticateUser, user_routes_1.default);
app.use("/api/projects", auth_1.authenticateUser, projects_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello world!");
});
(0, socket_1.default)(io);
app.use(not_found_middleware_1.notFound);
app.use(error_middleware_1.errorHandlerMiddleware);
const port = process
    .env
    .PORT ||
    5000;
const start = async () => {
    try {
        await (0, connect_1.connectDB)(process
            .env
            .MONGO_URI ||
            "mongodb://localhost:27017/samo");
        http.listen(port, () => {
            console.log("Example app listening on port 5000!");
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=app.js.map