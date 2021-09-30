import express from "express";
import commentController from "../controllers/commentController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/comment", auth, commentController.createComment);

export default router;
