import express from "express";
import userController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router = express.Router();

router.patch("/user", auth, userController.updateUser);

router.patch("/reset_password", auth, userController.resetPassword);

router.get("/user/:id", userController.getUser);

export default router;
