import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { validateEmail, validPhone } from "../middlewares/valid";
import { sendSms } from "../config/sendSms";
import jwt from "jsonwebtoken";
import {
  IDecodedToken,
  IUser,
  IGooglePayload,
  IUserParams,
} from "../config/interface";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(`${process.env.AIL_CLIENT_ID}`);

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

      const user = await Users.findOne({ account: newUser.account });

      if (user) return res.status(400).json({ msg: "Usuário já existe." });

      const createUser = new Users(newUser);

      await createUser.save();

      res.json({ msg: "Conta foi validada com sucesso, aproveite ;)" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });

      if (!user) return res.status(400).json({ msg: "Conta não localizado." });

      //if user exist
      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ msg: error });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("blogdev-refreshtoken", { path: `/api/refresh_token` });

      return res.json({ msg: "Usuário deslogado" });
    } catch (error: any) {
      return res.status(500).json({ msg: error });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const refresh_token = req.cookies.refreshtoken;
      if (!refresh_token)
        return res.status(400).json({ msg: "Por gentileza faça o login." });

      const decoded = <IDecodedToken>(
        jwt.verify(refresh_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      if (!decoded.id)
        return res.status(400).json({ msg: "Por gentileza faça o login." });

      const user = await Users.findById(decoded.id).select("-password");

      if (!user) return res.status(400).json({ msg: "Essa conta não existe." });

      const access_token = generateAccessToken({ id: user._id });

      res.json({ access_token, user });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  googleLogin: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body;

      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIN_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = <IGooglePayload>(
        verify.getPayload()
      );

      if (!email_verified)
        return res.status(500).json({ msg: "verificação de E-mail falhou." });

      const password = email + "your google secret password";
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ account: email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture,
          type: "login",
        };
        registerUser(user, res);
      }
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ msg: "Conta ou senha incorreta." });

  const access_token = generateAccessToken({ id: user._id });

  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });

  res.json({
    msg: "Sucesso ao logar",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user);
  await newUser.save();

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });

  res.json({
    msg: "Sucesso ao logar",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default authController;
