import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";
import { InputChange, FormSubmit } from "../../utils/TypeScript";

const RegisterForm = () => {
  const initialState = { name: "", account: "", password: "", cf_password: "" };
  const [userRegister, setUserRegister] = React.useState(initialState);
  const { name, account, password, cf_password } = userRegister;

  const [typePass, setTypePass] = React.useState(false);
  const [typeCfPass, setTypeCfPass] = React.useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>

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

      <div className="form-group mb-3">
        <label htmlFor="cf_password" className="form-label">
          Confirme a senha
        </label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleInputChange}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 my-1"
        disabled={account && password ? false : true}
      >
        Criar
      </button>
    </form>
  );
};

export default RegisterForm;
