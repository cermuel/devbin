import { Router } from "express";
const router = Router();
import { getAllUsers, getSingleUser, showCurrentUser } from "./user.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { isValidId } from "../projects/connect.dto";


router.get("/me" ,showCurrentUser);
router.get("/:id", validateRequest({params: isValidId}),getSingleUser);
router.get("/", getAllUsers);

export default router;