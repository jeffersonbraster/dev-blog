import { IUserRegister } from "./TypeScript";

export const validRegister = (userRegister: IUserRegister) => {
  const { name, account, password, cf_password } = userRegister;

  const errors: string[] = [];

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

  const msg = checkPassword(password, cf_password);
  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "Senha não pode ser menor que 6 digitos";
  } else if (password.length > 10) {
    return "Senha não pode ser maior que 10 digitos";
  } else if (password !== cf_password) {
    return "Senha e confirmar senha estão diferentes";
  }
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
