import express from "express";
import blogController from "../controllers/blogController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/blog", auth, blogController.createBlog);

router.get("/home/blogs", blogController.getHomeBlogs);

router.get("/blogs/:category_id", blogController.getHomeBlogsByCategory);

export default router;
