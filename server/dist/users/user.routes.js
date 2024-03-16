"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("./user.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const connect_dto_1 = require("../projects/connect.dto");
router.get("/me", user_controller_1.showCurrentUser);
router.get("/:id", (0, validate_middleware_1.validateRequest)({ params: connect_dto_1.isValidId }), user_controller_1.getSingleUser);
router.get("/", user_controller_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map