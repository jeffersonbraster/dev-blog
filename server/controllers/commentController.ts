import { Request, Response } from "express";
import Comments from "../models/commentModel";
import { IReqAuth } from "../config/interface";

const commentController = {
  createComment: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Autenticação invalida." });
    try {
      const { content, blog_id, blog_user_id } = req.body;

      const newComment = new Comments({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
      });

      await newComment.save();

      return res.status(201).json(newComment);
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default commentController;
