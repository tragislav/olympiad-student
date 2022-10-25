import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { userRegistration } from "../../api/auth";

import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";
import RegistrationSuccess from "../../components/RegistrationSuccess";

import schema from "./validation";

import "./styled.css";

function Registration() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    againPassword: false,
    email: false,
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const username = register("username");
  const password = register("password");
  const repeatPassword = register("repeatPassword");
  const email = register("email");

  const onSubmit = (inputs) => {
    const { username, password, repeatPassword, email } = inputs;
    password === repeatPassword
      ? userRegistration(email, username, password)
          .then(() => {
            setIsSuccess(true);
          })
          .catch((e) => {
            console.error(e);
            alert("Регистрация не прошла");
          })
      : setError({ ...error, againPassword: true });
  };

  if (isSuccess) {
    return (
      <RegistrationSuccess
        text="Спасибо, вы зарегистрированы, письмо с подтверждением ваших
        регистрационных данных отправлено вам на почту."
        nav="/"
      />
    );
  } else {
    return (
      <div className="LoginContainer">
        <div className="LoginFormWrapper">
          <h3 className="LoginFormTitle">Регистрация</h3>
          <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={
                error.username ? "LoginFormInput errorInput" : "LoginFormInput"
              }
              ref={username.ref}
              name={username.name}
              onBlur={username.onBlur}
              onChange={username.onChange}
              type="text"
              placeholder="Введите логин"
              required
            />
            <div
              className={
                error.username ? "ErrorWrapper opacity1" : "ErrorWrapper"
              }
            >
              <ErrorIcon />
              <p className="LoginFormError">Неверное имя пользователя</p>
            </div>
            <input
              className={
                error.password ? "LoginFormInput errorInput" : "LoginFormInput"
              }
              ref={password.ref}
              name={password.name}
              onBlur={password.onBlur}
              onChange={password.onChange}
              type="password"
              placeholder="Введите пароль"
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
                  ? "LoginFormInput errorInput"
                  : "LoginFormInput"
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
            <input
              className={
                error.email ? "LoginFormInput errorInput" : "LoginFormInput"
              }
              ref={email.ref}
              name={email.name}
              onBlur={email.onBlur}
              onChange={email.onChange}
              type="email"
              placeholder="Введите адрес электронной почты"
              required
            />
            <div
              className={error.email ? "ErrorWrapper opacity1" : "ErrorWrapper"}
            >
              <ErrorIcon />
              <p className="LoginFormError">Некорректный email</p>
            </div>
            <button className="LoginFormSubmit" type="submit">
              Зарегистрироваться
            </button>
          </form>
          <div className="RegistrationFooterForm">
            <Link className="LoginFooterFormLink" to="/">
              Назад
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
