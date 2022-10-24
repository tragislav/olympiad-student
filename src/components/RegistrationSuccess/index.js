import { useNavigate } from "react-router-dom";
import { ReactComponent as SuccessIcon } from "../../images/success-icon.svg";

import "./styled.css";

function RegistrationSuccess({
  text,
  nav,
  title = "Вы успешно зарегистрированы!",
}) {
  const navigate = useNavigate();

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
          <button className="SuccessBtn" onClick={() => navigate(nav)}>
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
