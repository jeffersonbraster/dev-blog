import RegisterForm from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Registro</h3>
        <RegisterForm />
        <p className="mt-2">
          {`Já possui uma conta? `}
          <Link
            to={`/login`}
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
