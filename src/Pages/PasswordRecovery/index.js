import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import RegistrationSuccess from "../../components/RegistrationSuccess";
import schema from "./validation";
import "./styled.css";
import { sendMailToRecoveryPassword } from "../../api/auth";

function PasswordRecovery() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (inputs) => {
    const { email } = inputs;
    console.log(email);
    sendMailToRecoveryPassword(email)
      .then(() => {
        console.log("success");
        setIsSuccess(true);
      })
      .catch((e) => {
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
      <div className="RecoveryContainer">
        <div className="RecoveryFormWrapper">
          <h3 className="RecoveryFormTitle">Восстановление пароля</h3>
          <p className="RecoveryText bold">
            Укажите ваш Адрес электронной почты
          </p>
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
}

export default PasswordRecovery;
