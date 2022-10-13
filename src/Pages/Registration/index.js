import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { userRegistration } from "../../api/auth";

import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";

import schema from "./validation";

import "./styled.css";

function Registration() {
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
          .then((data) => console.log(data))
          .catch((e) => console.log(e))
      : setError({ ...error, againPassword: true });
  };

  return (
    <div className="RegistrationContainer">
      <div className="RegistrationFormWrapper">
        <h3 className="RegistrationFormTitle">Регистрация</h3>
        <form className="RegistrationForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            className={
              error.username
                ? "RegistrationFormInput errorInput"
                : "RegistrationFormInput"
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
              error.password
                ? "RegistrationFormInput errorInput"
                : "RegistrationFormInput"
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
          {console.log(error)}
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
          <input
            className={
              error.email
                ? "RegistrationFormInput errorInput"
                : "RegistrationFormInput"
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
            <p className="LoginFormError">Пароли не совпадают</p>
          </div>
          <button className="RegistrationFormSubmit" type="submit">
            Зарегестрироваться
          </button>
        </form>
        <div className="RegistrationFooterForm">
          <Link className="RegistrationFooterFormLink" to="/">
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
