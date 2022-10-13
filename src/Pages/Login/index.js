import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { authByUsername } from "../../api/auth";

import { useAuth } from "../../hooks/useAuth";

import schema from "./validation";

import { ReactComponent as ErrorIcon } from "../../images/error-icon.svg";

import "./styled.css";

function Login() {
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      signIn(JSON.parse(sessionStorage.getItem("user")), () =>
        navigate(location.state ? location.state?.from : `/main`, {
          replace: true,
        })
      );
    }
  }, [location, navigate, signIn]);

  const onSubmit = ({ username, password }) => {
    setDisable(true);
    authByUsername(username, password)
      .then((data) => {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("user", JSON.stringify(data));
        reset();
        signIn(data, () =>
          navigate(`/main`, {
            replace: true,
          })
        );
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setDisable(false);
        setTimeout(() => setError(false), 5000);
      });
  };

  const username = register("username");
  const password = register("password");

  return (
    <div className="LoginContainer">
      <div className="LoginFormWrapper">
        <h3 className="LoginFormTitle">Вход в личный кабинет</h3>
        {error ? (
          <p className="LoginFormError">
            Ошибка авторизации, попробуйте ещё раз
          </p>
        ) : null}
        <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="LoginFormInput"
            ref={username.ref}
            name={username.name}
            onBlur={username.onBlur}
            onChange={username.onChange}
            type="text"
            placeholder="Ваш Логин"
            required
          />
          <input
            className="LoginFormInput"
            ref={password.ref}
            name={password.name}
            onBlur={password.onBlur}
            onChange={password.onChange}
            type="password"
            placeholder="Ваш Пароль"
            required
          />
          <button className="LoginFormSubmit" type="submit" disabled={disable}>
            Войти
          </button>
        </form>
        <div className="LoginFooterForm">
          <Link className="LoginFooterFormLink" to="/registration">
            Регистрация
          </Link>
          <Link
            className="LoginFooterFormLink underline"
            to="/passwordRecovery"
          >
            Забыли пароль?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
