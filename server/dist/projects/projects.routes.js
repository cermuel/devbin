"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const projects_controller_1 = require("./projects.controller");
const http_status_codes_1 = require("http-status-codes");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const connect_dto_1 = require("./connect.dto");
router
    .route("/")
    .post(async (req, res) => {
    const { name, files } = req.body;
    const project = await (0, projects_controller_1.createProject)(name, files, req.user);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({
        msg: "Project created Sucessfully",
        data: { project },
        statusCode: http_status_codes_1.StatusCodes.CREATED,
    });
})
    .get(async (req, res) => {
    const projects = await (0, projects_controller_1.getAllProjects)(req.query);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Projects fetched Sucessfully",
        data: { projects },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.get("/my", async (req, res) => {
    req.query.owner = req.user._id;
    const projects = await (0, projects_controller_1.getMyProjects)(req.query);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Projects fetched Sucessfully",
        data: { projects },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.get("/invites", async (req, res) => {
    const requests = await (0, projects_controller_1.getCollaborationInvites)(req.user);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        msg: "Requests fetched Sucessfully",
        data: { requests },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.get("/requests", async (req, res) => {
    const requests = await (0, projects_controller_1.getCollaborationRequests)(req.user);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        msg: "Requests fetched Sucessfully",
        data: { requests },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.get("/requestsent", async (req, res) => {
    const requests = await (0, projects_controller_1.getSentCollaborationRequests)(req.user);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        msg: "Sent Requests fetched Sucessfully",
        data: { requests },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.get("/invitesent", async (req, res) => {
    const invites = await (0, projects_controller_1.getSentCollaborationInvites)(req.user);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        msg: "Sent Invites fetched Sucessfully",
        data: { invites },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router
    .route("/:id")
    .get((0, validate_middleware_1.validateRequest)({
    params: connect_dto_1.isValidId,
}), async (req, res) => {
    const project = await (0, projects_controller_1.getSingleProject)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Project fetched Sucessfully",
        data: { project },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
})
    .patch((0, validate_middleware_1.validateRequest)({
    params: connect_dto_1.isValidId,
}), async (req, res) => {
    const project = await (0, projects_controller_1.getSingleProject)(req.params.id);
    if (project.owner.toString() !==
        req.user._id.toString()) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({
            msg: "You are not authorized to update this project",
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
        });
    }
    project.name = req.body.name;
    await project.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Project updated Sucessfully",
        data: { project },
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.post("/:id/invite", (0, validate_middleware_1.validateRequest)({
    body: connect_dto_1.inviteCollabValid,
    params: connect_dto_1.isValidId,
}), async (req, res) => {
    const msg = await (0, projects_controller_1.inviteCollaboration)(req.params.id, req.body.user, req.user._id);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        msg,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.post("/:id/request", (0, validate_middleware_1.validateRequest)({
    params: connect_dto_1.isValidId,
}), async (req, res) => {
    const msg = await (0, projects_controller_1.requestCollaboration)(req.params.id, req.user._id);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        msg,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.post("/invite/:id/respond", (0, validate_middleware_1.validateRequest)({
    params: connect_dto_1.isValidId,
}), async (req, res) => {
    const { response } = req.body;
    const msg = await (0, projects_controller_1.respondToInvite)(req.params.id, response, req.user);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
router.post("/request/:id/respond", (0, validate_middleware_1.validateRequest)({
    params: connect_dto_1.isValidId,
}), async (req, res) => {
    const { response } = req.body;
    const msg = await (0, projects_controller_1.respondToRequest)(req.params.id, response, req.user);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg,
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
});
exports.default = router;
//# sourceMappingURL=projects.routes.js.map