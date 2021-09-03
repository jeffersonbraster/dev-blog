import { Request, Response, NextFunction } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { generateActiveToken } from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { validateEmail, validPhone } from "../middlewares/valid";
import { sendSms } from "../config/sendSms";
import jwt from "jsonwebtoken";
import { IDecodedToken } from "../config/interface";

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, password, account } = req.body;

      const user = await Users.findOne({ account });

      if (user)
        return res.status(400).json({ msg: "E-mail ou número já existe." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken({ newUser });

      const url = `${process.env.BASE_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        sendEmail(account, url, "Verify your email address");

        return res.json({
          status: "Criado com sucesso, verifique seu Email.",
        });
      } else if (validPhone(account)) {
        sendSms(account, url, "Verify your phone number");
        return res.json({
          status:
            "Criado com sucesso, verifique sua caixa de mensagens em seu celular.",
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });

      const user = new Users(newUser);

      await user.save();

      res.json({ msg: "Conta foi validada com sucesso, aproveite ;)" });
    } catch (error: any) {
      let errorMsg: any;

      if (error.code === 11000) {
        errorMsg = Object.keys(error.keyValue)[0] + " already exists.";
      } else {
        let name = Object.keys(error.errors)[0];
        errorMsg = error.errors[`${name}`].message;

        return res.status(500).json({ msg: errorMsg });
      }

      return res.status(500).json({ msg: errorMsg });
    }
  },
};

export default authController;
