import { Request, Response } from "express";
import Categories from "../models/categoryModel";
import { IReqAuth } from "../config/interface";

const categoryController = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Autenticação invalida." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Sem permissão." });
    try {
      const name = req.body.name.toLowerCase();

      const category = await Categories.findOne({ name });

      if (category)
        return res.status(400).json({ msg: "Categoria já existe." });

      const newCategory = new Categories({ name });

      await newCategory.save();

      res.json({ msg: "Categoria criada com sucesso.", newCategory });
    } catch (error: any) {
      let errMsg;

      if (error.code === 11000) {
        errMsg = Object.values(error.keyValue)[0] + " já existe";
      } else {
        let name = Object.keys(error.errors)[0];

        errMsg = error.errors[`${name}`].message;
      }
      return res.status(500).json({ msg: errMsg });
    }
  },

  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Categories.find().sort("-createdAt");

      res.json({ categories });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategories: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Autenticação invalida." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Sem permissão." });
    try {
      const name = req.body.name.toLowerCase();
      await Categories.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { name }
      );

      res.json({ msg: "Categoria atualizado!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategories: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Autenticação invalida." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Sem permissão." });
    try {
      const category = await Categories.findByIdAndDelete(req.params.id);

      res.json({ msg: "Categoria deletado com sucesso!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default categoryController;
