import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ReactComponent as SuccessIcon } from "../../images/success-icon.svg";

import "./styled.css";

function RegistrationSuccess({
  text,
  nav,
  title = "Вы успешно зарегистрированы!",
  logout = false,
}) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="LoginContainer">
      <div className="SuccessWrapper">
        <div className="SuccessTitle">
          <SuccessIcon />
          <h3 className="SuccessTitleText">{title}</h3>
        </div>
        <div className="SuccessContent">
          <p className="SuccessContentText">{text}</p>
        </div>
        <div className="SuccessBtnWrapper">
          <button
            className="SuccessBtn"
            onClick={() => {
              if (logout) {
                signOut(() => {
                  sessionStorage.removeItem("username");
                  sessionStorage.removeItem("password");
                  sessionStorage.removeItem("user");
                  navigate(nav);
                });
              } else {
                navigate(nav);
              }
            }}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
