import { Request, Response, NextFunction } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Por gentileza digite um nome");
  } else if (name.length > 30) {
    errors.push("Seu nome ultrapassou o limite de 30 caracteres.");
  }

  if (!account) {
    errors.push("Obrigatorio adicionar E-mail ou telefone para acesso.");
  } else if (!validPhone(account) && !validateEmail(account)) {
    errors.push("Formato do E-mail ou número incorreto.");
  }

  if (password.length < 6) {
    errors.push("Senha não pode ser menor que 6 digitos");
  } else if (password.length > 10) {
    errors.push("Senha não pode ser maior que 10 digitos");
  }

  if (errors.length > 0) return res.status(400).json({ msg: errors });

  next();
};

export function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
