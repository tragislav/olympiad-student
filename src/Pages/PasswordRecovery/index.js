import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./validation";
import "./styled.css";

function PasswordRecovery() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (inputs) => {
    console.log(inputs);
  };

  const email = register("email");

  return (
    <div className="RecoveryContainer">
      <div className="RecoveryFormWrapper">
        <h3 className="RecoveryFormTitle">Восстановление пароля</h3>
        <p className="RecoveryText bold">Укажите ваш Адрес электронной почты</p>
        <p className="RecoveryText">
          Пожалуйста, укажите email, который вы использовали для входа
        </p>
        <form className="RecoveryForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="RecoveryFormInput"
            ref={email.ref}
            name={email.name}
            onBlur={email.onBlur}
            onChange={email.onChange}
            type="text"
            placeholder="Введить вашу почту"
            required
          />
          <button className="RecoveryFormSubmit" type="submit">
            Отправить
          </button>
        </form>
        <div className="RecoveryFooterForm">
          <Link className="RecoveryFooterFormLink" to="/">
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
