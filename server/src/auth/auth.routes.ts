import { Router } from "express";
import { login, register } from "./auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { UserSchemaValidation, LoginValidation } from "../users/users.dto";

const router = Router();

router.post(
  "/login",
  validateRequest({
    body: LoginValidation,
  }),
  login
);
router.post(
  "/register",
  validateRequest({
    body: UserSchemaValidation,
  }),
  register
);

export default router;
