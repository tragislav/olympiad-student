import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./validation";
import "./styled.css";

function Login() {
  const [disable, setDisable] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const getFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
    return formData;
  };

  const onSubmit = (inputs) => {
    setDisable(true);
    console.log(inputs);
  };

  const username = register("username");
  const password = register("password");

  return (
    <div className="LoginContainer">
      <div className="LoginFormWrapper">
        <h3 className="LoginFormTitle">Вход в личный кабинет</h3>
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
          <button className="LoginFormSubmit" type="submit">
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