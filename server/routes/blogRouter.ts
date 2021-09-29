import express from "express";
import blogController from "../controllers/blogController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/blog", auth, blogController.createBlog);

router.get("/home/blogs", blogController.getHomeBlogs);

router.get("/blogs/category/:id", blogController.getHomeBlogsByCategory);

router.get("/blogs/user/:id", blogController.getHomeBlogsByUser);

export default router;
