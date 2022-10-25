import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import RegistrationSuccess from "../../components/RegistrationSuccess";
import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";
import schema from "./validation";
import "./styled.css";
import { sendMailToRecoveryPassword } from "../../api/auth";

function PasswordRecovery() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (inputs) => {
    const { email } = inputs;
    sendMailToRecoveryPassword(email)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((e) => {
        setError(true);
        console.error(e);
      });
  };

  const email = register("email");

  if (isSuccess) {
    return (
      <RegistrationSuccess
        title="Письмо отправлено"
        text="Спасибо, письмо для восстановления пароля отправлено вам на почту."
        nav="/"
      />
    );
  } else {
    return (
      <div className="LoginContainer">
        <div className="LoginFormWrapper">
          <h3 className="LoginFormTitle">Восстановление пароля</h3>
          <p className="RecoveryText bold">
            Укажите ваш Адрес электронной почты
          </p>
          <p className="RecoveryText">
            Пожалуйста, укажите email, который вы использовали для входа
          </p>
          <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="LoginFormInput"
              ref={email.ref}
              name={email.name}
              onBlur={email.onBlur}
              onChange={email.onChange}
              type="text"
              placeholder="Введить вашу почту"
              required
            />
            <div className={error ? "ErrorWrapper opacity1" : "ErrorWrapper"}>
              <ErrorIcon />
              <p className="LoginFormError">Некорректный email</p>
            </div>
            <button className="LoginFormSubmit" type="submit">
              Отправить
            </button>
          </form>
          <div className="RecoveryFooterForm">
            <Link className="LoginFooterFormLink" to="/">
              Назад
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordRecovery;
