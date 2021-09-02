import { Request, Response, NextFunction } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Por gentileza digite um nome" });
  } else if (name.length > 30) {
    return res
      .status(400)
      .json({ msg: "Seu nome ultrapassou o limite de 30 caracteres." });
  }

  if (!account) {
    return res
      .status(400)
      .json({ msg: "Obrigatorio adicionar E-mail ou telefone para acesso." });
  } else if (!validPhone(account) && !validateEmail(account)) {
    return res
      .status(400)
      .json({ msg: "Formato do E-mail ou número incorreto." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Senha não pode ser menor que 6 digitos" });
  } else if (password.length > 10) {
    return res
      .status(400)
      .json({ msg: "Senha não pode ser maior que 10 digitos" });
  }

  next();
};

function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
