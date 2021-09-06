import React from "react";

const LoginSms = () => {
  const [phone, setPhone] = React.useState("");
  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="form-label">
          Número
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100"
        disabled={phone ? false : true}
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginSms;
