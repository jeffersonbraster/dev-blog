import express from "express";
import authController from "../controllers/authController";
import { validRegister } from "../middlewares/valid";

const router = express.Router();

router.post("/register", validRegister, authController.register);

router.post("/active", authController.activeAccount);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/refresh_token", authController.refreshToken);

export default router;
