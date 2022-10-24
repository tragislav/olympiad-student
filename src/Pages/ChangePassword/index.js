import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import { resetPassword, userRegistration } from "../../api/auth";

import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";
import RegistrationSuccess from "../../components/RegistrationSuccess";

function ChangePassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    againPassword: false,
    email: false,
  });
  const { uid } = useParams();

  const { register, handleSubmit } = useForm({});

  const password = register("password");
  const repeatPassword = register("repeatPassword");

  const onSubmit = (inputs) => {
    const { password, repeatPassword } = inputs;
    switch (password === repeatPassword) {
      case true:
        console.log(inputs);
        resetPassword({ token: uid, password })
          .then(() => {
            setIsSuccess(true);
          })
          .then((e) => console.error(e));
        break;
      case false:
        setError({ ...error, againPassword: true });
        setTimeout(() => {
          setError({ ...error, againPassword: false });
        }, 3000);
        break;
      default:
        break;
    }
  };

  if (isSuccess) {
    return (
      <RegistrationSuccess
        title="Пароль сменён"
        text="Спасибо, вы сменили пароль, теперь вы можете войти в систему с новыми данными пользователя."
        nav="/"
      />
    );
  } else {
    return (
      <div className="RegistrationContainer">
        <div className="RegistrationFormWrapper">
          <h3 className="RegistrationFormTitle">Смена пароля</h3>
          <form className="RegistrationForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={
                error.password
                  ? "RegistrationFormInput errorInput"
                  : "RegistrationFormInput"
              }
              ref={password.ref}
              name={password.name}
              onBlur={password.onBlur}
              onChange={password.onChange}
              type="password"
              placeholder="Введите новый пароль"
              required
            />
            <div
              className={
                error.password ? "ErrorWrapper opacity1" : "ErrorWrapper"
              }
            >
              <ErrorIcon />
              <p className="LoginFormError">Неверный пароль</p>
            </div>
            <input
              className={
                error.againPassword
                  ? "RegistrationFormInput errorInput"
                  : "RegistrationFormInput"
              }
              ref={repeatPassword.ref}
              name={repeatPassword.name}
              onBlur={repeatPassword.onBlur}
              onChange={repeatPassword.onChange}
              type="password"
              placeholder="Потвердите ваш пароль"
              required
            />
            <div
              className={
                error.againPassword ? "ErrorWrapper opacity1" : "ErrorWrapper"
              }
            >
              <ErrorIcon />
              <p className="LoginFormError">Пароли не совпадают</p>
            </div>
            <button className="RegistrationFormSubmit" type="submit">
              Сменить пароль
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
