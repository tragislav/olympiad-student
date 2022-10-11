import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState } from "../../store/main/reducer";

import "./styled.css";

function PersonalData() {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [disable, setDisable] = useState(true);

  const userInfo = useSelector((state) => state.main.info);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    privacyPolicy && dataProcessing ? setDisable(false) : setDisable(true);
  }, [dataProcessing, privacyPolicy]);

  const onSubmit = (inputs) => {
    console.log(inputs);
    dispatch(addToStore(inputs));
    dispatch(addToState());
    navigate("/representative");
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
                    defaultValue={userInfo.name ? userInfo.name : null}
                    required
                  />
                </div>
                <div>
                  <p>Фамилия</p>
                  <input
                    {...register("surname")}
                    type="text"
                    placeholder="Введите фамилию"
                    defaultValue={userInfo.surname ? userInfo.surname : null}
                    required
                  />
                </div>
                <div>
                  <p>Отчество</p>
                  <input
                    {...register("patronymic")}
                    type="text"
                    placeholder="Введите отчество"
                    defaultValue={
                      userInfo.patronymic ? userInfo.patronymic : null
                    }
                    required
                  />
                </div>
                <div>
                  <p>Дата рождения</p>
                  <input
                    {...register("date")}
                    type="date"
                    placeholder="дд.мм.гггг"
                    defaultValue={userInfo.date ? userInfo.date : null}
                    required
                  />
                </div>
                <div>
                  <p>Телефон</p>
                  <input
                    {...register("phone")}
                    placeholder="Введите номер телефона"
                    defaultValue={userInfo.phone ? userInfo.phone : null}
                    type="tel"
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                    required
                  />
                </div>
                <div>
                  <p>Эл.почта</p>
                  <input
                    {...register("email")}
                    defaultValue={userInfo.email ? userInfo.email : null}
                    type="email"
                    required
                  />
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
                    defaultValue={userInfo.region ? userInfo.region : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Район</p>
                  <input
                    {...register("area")}
                    placeholder="Введите район"
                    defaultValue={userInfo.area ? userInfo.area : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Населённый пункт</p>
                  <input
                    {...register("town")}
                    placeholder="Введите населённый пункт"
                    defaultValue={userInfo.town ? userInfo.town : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Улица (проспект, переулок)</p>
                  <input
                    {...register("street")}
                    placeholder="Введите название улицы, проспекта, переулока"
                    defaultValue={userInfo.street ? userInfo.street : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Дом</p>
                  <input
                    {...register("house")}
                    defaultValue={userInfo.house ? userInfo.house : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Корп.</p>
                  <input
                    {...register("frame")}
                    defaultValue={userInfo.frame ? userInfo.frame : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Кв.</p>
                  <input
                    {...register("flat")}
                    defaultValue={userInfo.flat ? userInfo.flat : null}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Учебное учреждение</p>
                  <input
                    {...register("establishment")}
                    placeholder="Выберите учебное учреждение"
                    defaultValue={
                      userInfo.establishment ? userInfo.establishment : null
                    }
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
                    defaultValue={
                      userInfo.documentType ? userInfo.documentType : null
                    }
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Серия</p>
                  <input
                    {...register("documentSeries")}
                    defaultValue={
                      userInfo.documentSeries ? userInfo.documentSeries : null
                    }
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Номер</p>
                  <input
                    {...register("documentNumber")}
                    defaultValue={
                      userInfo.documentNumber ? userInfo.documentNumber : null
                    }
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Индентификационный номер</p>
                  <input
                    {...register("identificationNumber")}
                    defaultValue={
                      userInfo.identificationNumber
                        ? userInfo.identificationNumber
                        : null
                    }
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
              <label htmlFor="privacyPolicy">Политика конфиденциальности</label>
              <input
                type="checkbox"
                name="dataProcessing"
                onChange={() => setDataProcessing(!dataProcessing)}
              />
              <label htmlFor="dataProcessing">
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
