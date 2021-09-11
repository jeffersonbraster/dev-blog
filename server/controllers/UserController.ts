import { Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import bcrypt from "bcrypt";

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
  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Autenticação invalida" });

    if (req.user.type !== "register")
      return res
        .status(400)
        .json({ msg: "Sem autorização para fazer esse processo." });
    try {
      const { password } = req.body;

      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
        }
      );
      res.json({ mgs: "Reset da senha feita com sucesso!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default userController;
