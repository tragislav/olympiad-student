import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import schema from "./validation";
import "./styled.css";
import { Link } from "react-router-dom";

function Registration() {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const username = register("username");
  const password = register("password");
  const repeatPassword = register("repeatPassword");
  const email = register("email");

  const onSubmit = (inputs) => {
    const { username, password, repeatPassword, email } = inputs;
    console.log(inputs);
    console.log(username, "username");
    console.log(password, "password");
    console.log(repeatPassword, "repeatPassword");
    console.log(email, "email");
    console.log(password === repeatPassword);
  };

  return (
    <div className="RegistrationContainer">
      <div className="RegistrationFormWrapper">
        <h3 className="RegistrationFormTitle">Регистрация</h3>
        <form className="RegistrationForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="RegistrationFormInput"
            ref={username.ref}
            name={username.name}
            onBlur={username.onBlur}
            onChange={username.onChange}
            type="text"
            placeholder="Введите логин"
            required
          />
          <input
            className="RegistrationFormInput"
            ref={password.ref}
            name={password.name}
            onBlur={password.onBlur}
            onChange={password.onChange}
            type="password"
            placeholder="Введите пароль"
            required
          />
          <input
            className="RegistrationFormInput"
            ref={repeatPassword.ref}
            name={repeatPassword.name}
            onBlur={repeatPassword.onBlur}
            onChange={repeatPassword.onChange}
            type="password"
            placeholder="Потвердите ваш пароль"
            required
          />
          <input
            className="RegistrationFormInput"
            ref={email.ref}
            name={email.name}
            onBlur={email.onBlur}
            onChange={email.onChange}
            type="email"
            placeholder="Введите адрес электронной почты"
            required
          />
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
