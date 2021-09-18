import express from "express";
import blogController from "../controllers/blogController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/blog", auth, blogController.createBlog);

export default router;
