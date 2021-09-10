import express from "express";
import userController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router = express.Router();

router.patch("/user", auth, userController.updateUser);

export default router;
