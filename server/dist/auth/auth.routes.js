"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const users_dto_1 = require("../users/users.dto");
const router = (0, express_1.Router)();
router.post("/login", (0, validate_middleware_1.validateRequest)({
    body: users_dto_1.LoginValidation,
}), auth_controller_1.login);
router.post("/register", (0, validate_middleware_1.validateRequest)({
    body: users_dto_1.UserSchemaValidation,
}), auth_controller_1.register);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map