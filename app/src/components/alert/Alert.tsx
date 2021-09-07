import { useSelector } from "react-redux";
import { RootReducer } from "../../utils/TypeScript";
import Loading from "./Loading";
import Toast from "./Toast";

export const Alert = () => {
  const { alert } = useSelector((state: RootReducer) => state);
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.errors && (
        <Toast title="Error" body={alert.errors} bgColor="bg-danger" />
      )}

      {alert.success && (
        <Toast title="Sucesso" body={alert.success} bgColor="bg-success" />
      )}
    </div>
  );
};

export const showErrMsg = (msg: string) => {
  return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = (msg: string) => {
  return <div className="successMsg">{msg}</div>;
};
