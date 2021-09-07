import React from "react";
import { useParams } from "react-router-dom";

import { IParams } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";
import { showErrMsg, showSuccessMsg } from "../../components/alert/Alert";

const Active = () => {
  const { slug }: IParams = useParams();

  const [success, setSuccess] = React.useState("");
  const [err, setError] = React.useState("");

  React.useEffect(() => {
    if (slug) {
      postAPI("active", { active_token: slug })
        .then((res) => setSuccess(res.data.msg))
        .catch((err) => setError(err.message));
    }
  }, [slug]);

  return (
    <div>
      {err && showErrMsg("Token invalido")}
      {success && showSuccessMsg(success)}
    </div>
  );
};

export default Active;
