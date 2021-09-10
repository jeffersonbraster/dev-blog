import { Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";

const userController = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Autenticação invalida" });
    try {
      const { avatar, name } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          name,
        }
      );
      res.json({ mgs: "Alteração feita com sucesso!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default userController;
