import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styled.css";

function PersonalData() {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [disable, setDisable] = useState(true);
  const { register, handleSubmit, reset } = useForm({
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    privacyPolicy && dataProcessing ? setDisable(false) : setDisable(true);
  }, [dataProcessing, privacyPolicy]);

  const onSubmit = (inputs) => {
    console.log(inputs);
  };

  return (
    <div className="container">
      <div className="MainWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormWrapper">
            <div className="FormInner">
              <h2>Ф.И.О / Дата рождения / Телефон / Email</h2>
              <p>
                Заполните поля с отметкой * , чтобы перейти к дальнейшему шагу
                вашей регистрации.
              </p>
              <div>
                <div>
                  <p>Имя</p>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Введите имя"
                    required
                  />
                </div>
                <div>
                  <p>Фамилия</p>
                  <input
                    {...register("Surname")}
                    type="text"
                    placeholder="Введите фамилию"
                    required
                  />
                </div>
                <div>
                  <p>Отчество</p>
                  <input
                    {...register("patronymic")}
                    type="text"
                    placeholder="Введите отчество"
                    required
                  />
                </div>
                <div>
                  <p>Дата рождения</p>
                  <input
                    {...register("date")}
                    type="date"
                    placeholder="дд.мм.гггг"
                    required
                  />
                </div>
                <div>
                  <p>Телефон</p>
                  <input
                    {...register("phone")}
                    placeholder="Введите номер телефона"
                    type="tel"
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                    required
                  />
                </div>
                <div>
                  <p>Эл.почта</p>
                  <input {...register("email")} type="email" required />
                </div>
              </div>
            </div>
            <div className="FormInner">
              <h2>Место жительста / Место обучения</h2>
              <div>
                <div>
                  <p>Область</p>
                  <input
                    {...register("region")}
                    placeholder="Введите область"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Район</p>
                  <input
                    {...register("area")}
                    placeholder="Введите район"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Населённый пункт</p>
                  <input
                    {...register("town")}
                    placeholder="Введите населённый пункт"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Улица (проспект, переулок)</p>
                  <input
                    {...register("street")}
                    placeholder="Введите название улицы, проспекта, переулока"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Дом</p>
                  <input {...register("house")} type="text" required />
                </div>
                <div>
                  <p>Корп.</p>
                  <input {...register("frame")} type="text" required />
                </div>
                <div>
                  <p>Кв.</p>
                  <input {...register("flat")} type="text" required />
                </div>
                <div>
                  <p>Учебное учреждение</p>
                  <input
                    {...register("establishment")}
                    placeholder="Выберите учебное учреждение"
                    type="text"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="FormInner">
              <h2>Паспортные данные</h2>
              <div>
                <div>
                  <p>Вид документа</p>
                  <input
                    {...register("documentType")}
                    placeholder="Выбрать"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Серия</p>
                  <input {...register("documentSeries")} type="text" required />
                </div>
                <div>
                  <p>Номер</p>
                  <input {...register("documentNumber")} type="text" required />
                </div>
                <div>
                  <p>Индентификационный номер</p>
                  <input
                    {...register("identificationNumber")}
                    type="text"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="SecondaryContent">
            <h2>Обработка ваших данных</h2>
            <p>
              При создании учетной записи вы даете согласие с нашими правилами и
              условиями пользования веб-сервисом
            </p>
            <div>
              <input
                type="checkbox"
                name="privacyPolicy"
                onChange={() => setPrivacyPolicy(!privacyPolicy)}
              />
              <label for="privacyPolicy">Политика конфиденциальности</label>
              <input
                type="checkbox"
                name="dataProcessing"
                onChange={() => setDataProcessing(!dataProcessing)}
              />
              <label for="dataProcessing">
                Обработка данных в соответствии с законом о персональных данных
                от 7 мая 2021 г. № 99-3.
              </label>
              <button type="submit" disabled={disable}>
                Продолжить {disable ? "низя" : "можна"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalData;
