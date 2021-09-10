import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStore, InputChange, IUserInfo } from "../../utils/TypeScript";

import NotFound from "../Global/NotFound";

const UserInfo = () => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
  };

  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [user, setUser] = React.useState<IUserInfo>(initState);
  const [typePass, setTypePass] = React.useState(false);
  const [typeCfPass, setTypeCfPass] = React.useState(false);

  const handleChangeInput = (e: InputChange) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  const { name, account, avatar, password, cf_password } = user;

  if (!auth.user) return <NotFound />;

  return (
    <form className="profile_info">
      <div className="info_avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          alt={auth.user.name}
        />

        <span>
          <i className="fas fa-camera" />
          <p>Mudar</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={handleChangeFile}
          />
        </span>
      </div>

      <div className="form-group my-3">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="account">E-mail</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          defaultValue={auth.user.account}
          onChange={handleChangeInput}
          disabled={true}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="password">Password</label>

        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <div className="form-group my-3">
        <label htmlFor="cf_password">Confirm Password</label>

        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button className="btn btn-dark w-100" type="submit">
        Alterar
      </button>
    </form>
  );
};

export default UserInfo;
