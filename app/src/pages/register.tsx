import RegisterForm from "../components/auth/RegisterForm";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Registro</h3>
        <RegisterForm />
        <p className="mt-2">
          {`Já possui uma conta? `}
          <Link
            to={`/login${history.location.search}`}
            style={{ color: "crimson", textDecoration: "none" }}
          >
            Faça o login!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
