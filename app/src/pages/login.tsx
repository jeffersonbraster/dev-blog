import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";
import LoginSocial from "../components/auth/SocialLogin";

import { RootStore } from "../utils/TypeScript";

const Login = () => {
  const history = useHistory();

  const { auth } = useSelector((state: RootStore) => state);

  React.useEffect(() => {
    if (auth.access_token) history.push("/");
  }, [history, auth.access_token]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        <LoginSocial />

        <LoginPass />

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="text-center">
            <Link to="/forgot_password" className="col-6">
              Esqueceu sua senha?
            </Link>
          </span>
        </small>

        <p className="text-center">
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
