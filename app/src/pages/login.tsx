import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";
import LoginSms from "../components/auth/LoginSms";

import { RootStore } from "../utils/TypeScript";

const Login = () => {
  const [sms, setSms] = React.useState(false);
  const history = useHistory();

  const { auth } = useSelector((state: RootStore) => state);

  React.useEffect(() => {
    if (auth.access_token) history.push("/");
  }, [history, auth.access_token]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        {sms ? <LoginSms /> : <LoginPass />}

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password" className="col-6">
              Esqueceu sua senha?
            </Link>
          </span>

          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Entrar com Senha" : "Entrar com SMS"}
          </span>
        </small>

        <p>
          {`Ainda não possui uma conta? `}
          <Link
            to={`/register`}
            style={{ color: "crimson", textDecoration: "none" }}
          >
            Cadastre aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
