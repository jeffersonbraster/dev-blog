import { Response } from "express";
import Blogs from "../models/blogModel";
import { IReqAuth } from "../config/interface";

const blogController = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Authenticação invalida." });

    try {
      const { title, thumbnail, content, description, category } = req.body;

      const newBlog = new Blogs({
        user: req.user._id,
        title,
        content,
        thumbnail,
        description,
        category,
      });

      await newBlog.save();
      res.json({ newBlog });
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  },
};

export default blogController;
