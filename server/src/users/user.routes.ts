import { Router } from "express";
const router = Router();
import { getAllUsers, getSingleUser, showCurrentUser } from "./user.controller";


router.get("/me" ,showCurrentUser);
router.get("/:id", getSingleUser);
router.get("/", getAllUsers);

export default router;