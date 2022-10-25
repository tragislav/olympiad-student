import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { userRegistration } from "../../api/auth";

import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";
import RegistrationSuccess from "../../components/RegistrationSuccess";

import schema from "./validation";

import "./styled.css";
import { catchError } from "../../helpers/catchError";

function Registration() {
  const [isVisible, setIsVisible] = useState({
    password: false,
    repeatPassword: false,
  });
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
    if (password === repeatPassword) {
      userRegistration(email, username, password)
        .then(() => {
          setIsSuccess(true);
        })
        .catch((e) => {
          console.error(e.response.data);
          let parse = catchError(e.response.data);
          console.log(parse);
          setError({ ...error, [parse.name]: parse.text });
          setTimeout(() => setError({ ...error, [parse.name]: false }), 3000);
        });
    } else {
      setError({ ...error, againPassword: true });
      setTimeout(() => setError({ ...error, againPassword: false }), 3000);
    }
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
            <p className="LoginText">Придумайте логин(от 4 до 7 символов)</p>
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
              minLength={4}
              maxLength={7}
              required
            />
            <div
              className={
                error.username ? "ErrorWrapper opacity1" : "ErrorWrapper"
              }
            >
              <ErrorIcon />
              <p className="LoginFormError">{error.username}</p>
            </div>
            <p className="LoginText">Придумайте пароль(от 4 до 16 символов)</p>
            <input
              className={
                error.password ? "LoginFormInput errorInput" : "LoginFormInput"
              }
              ref={password.ref}
              name={password.name}
              onBlur={password.onBlur}
              onChange={password.onChange}
              type={isVisible.password ? "text" : "password"}
              placeholder="Введите пароль"
              minLength={4}
              maxLength={16}
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
              <p className="LoginFormError">{error.password}</p>
            </div>
            <p className="LoginText">Повторите пароль</p>
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
              minLength={4}
              maxLength={16}
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
            <p className="LoginText">Введите ваш адрес электронной почты</p>
            <input
              className={
                error.email ? "LoginFormInput errorInput" : "LoginFormInput"
              }
              ref={email.ref}
              name={email.name}
              onBlur={email.onBlur}
              onChange={email.onChange}
              type="email"
              placeholder="Ваш email"
              required
            />
            <div
              className={error.email ? "ErrorWrapper opacity1" : "ErrorWrapper"}
            >
              <ErrorIcon />
              <p className="LoginFormError">{error.email}</p>
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
