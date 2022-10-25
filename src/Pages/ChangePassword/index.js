import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import { resetPassword, userRegistration } from "../../api/auth";

import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";
import RegistrationSuccess from "../../components/RegistrationSuccess";

function ChangePassword() {
  const [isVisible, setIsVisible] = useState({
    password: false,
    repeatPassword: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState({
    password: false,
    againPassword: false,
  });
  const { uid } = useParams();

  const { register, handleSubmit } = useForm({});

  const password = register("password");
  const repeatPassword = register("repeatPassword");

  const onSubmit = (inputs) => {
    const { password, repeatPassword } = inputs;
    switch (password === repeatPassword) {
      case true:
        resetPassword({ token: uid, password })
          .then(() => {
            setIsSuccess(true);
          })
          .then((e) => {
            console.error(e);
            setError({ ...error, password: true });
            setTimeout(() => {
              setError({ ...error, password: true });
            }, 3000);
          });
        break;
      case false:
        setError({ ...error, againPassword: true });
        setTimeout(() => {
          setError({ ...error, againPassword: true });
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
      <div className="LoginContainer">
        <div className="LoginFormWrapper">
          <h3 className="LoginFormTitle">Смена пароля</h3>
          <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={
                error.password ? "LoginFormInput errorInput" : "LoginFormInput"
              }
              ref={password.ref}
              name={password.name}
              onBlur={password.onBlur}
              onChange={password.onChange}
              type={isVisible.password ? "text" : "password"}
              placeholder="Введите новый пароль"
              required
            />
            <i
              class={
                isVisible.password ? "far fa-eye fa-eye-slash" : "far fa-eye"
              }
              id="togglePassword"
              onClick={() =>
                setIsVisible({ ...isVisible, password: !isVisible.password })
              }
              style={{ marginLeft: "-35px", cursor: "pointer" }}
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
                  ? "LoginFormInput errorInput"
                  : "LoginFormInput"
              }
              ref={repeatPassword.ref}
              name={repeatPassword.name}
              onBlur={repeatPassword.onBlur}
              onChange={repeatPassword.onChange}
              type={isVisible.repeatPassword ? "text" : "password"}
              placeholder="Потвердите ваш пароль"
              required
            />
            <i
              class={
                isVisible.repeatPassword
                  ? "far fa-eye fa-eye-slash"
                  : "far fa-eye"
              }
              id="togglePassword"
              onClick={() =>
                setIsVisible({
                  ...isVisible,
                  repeatPassword: !isVisible.repeatPassword,
                })
              }
              style={{ marginLeft: "-35px", cursor: "pointer" }}
            />
            <div
              className={
                error.againPassword ? "ErrorWrapper opacity1" : "ErrorWrapper"
              }
            >
              <ErrorIcon />
              <p className="LoginFormError">Пароли не совпадают</p>
            </div>
            <button className="LoginFormSubmit" type="submit">
              Сменить пароль
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
