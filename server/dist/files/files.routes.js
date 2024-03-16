"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const files_controller_1 = require("./files.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const connect_dto_1 = require("../projects/connect.dto");
const router = (0, express_1.Router)();
router.route("/:id").put((0, validate_middleware_1.validateRequest)({ params: connect_dto_1.isValidId }), async (req, res) => {
    const file = await (0, files_controller_1.updateFile)(req.params.id, req.body);
    res.status(200).json({ msg: "File updated Sucessfully", data: { file }, statusCode: 200 });
});
exports.default = router;
//# sourceMappingURL=files.routes.js.map