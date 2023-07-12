import { Router } from "express";
const router = Router();
import { showCurrentUser } from "./user.controller";
import { authenticateUser } from "../middlewares/auth";

router.get('/me', authenticateUser ,showCurrentUser)

export default router;