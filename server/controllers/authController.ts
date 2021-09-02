import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { generateActiveToken } from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { validateEmail } from "../middlewares/valid";

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

      const CLIENT_URL = `${process.env.BASE_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        sendEmail(account, CLIENT_URL, "Verify your email address");

        return res.json({
          status: "Criado com sucesso, verifique seu Email.",
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
};

export default authController;
