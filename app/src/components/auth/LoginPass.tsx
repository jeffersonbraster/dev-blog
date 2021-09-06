import React from "react";
import { InputChange } from "../../utils/TypeScript";

const LoginPass = () => {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = React.useState(initialState);
  const { account, password } = userLogin;

  const [typePass, setTypePass] = React.useState(false);

  const handleInputChange = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          E-mail
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 mt-1"
        disabled={account && password ? false : true}
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginPass;
