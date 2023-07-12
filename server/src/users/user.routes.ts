import { Router } from "express";
const router = Router();
import { showCurrentUser } from "./user.controller";


router.get("/me" ,showCurrentUser);

export default router;