import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState } from "../../store/main/reducer";

import "./styled.css";

function LegalRepresentative() {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [disable, setDisable] = useState(true);

  const userInfo = useSelector((state) => state.main.info);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (inputs) => {
    console.log(inputs);
    dispatch(addToStore(inputs));
    dispatch(addToState());
    navigate("/specialty");
  };

  useEffect(() => {
    privacyPolicy && dataProcessing ? setDisable(false) : setDisable(true);
  }, [dataProcessing, privacyPolicy]);

  return (
    <div className="container">
      <div className="MainWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormWrapper">
            <div className="FormInner">
              <div>
                <div>
                  <h3>Выбрать:</h3>
                  <div>
                    <label htmlFor="mother">
                      <input
                        {...register("representativeType", { required: true })}
                        type="radio"
                        id="mother"
                        value="mother"
                      />
                      Мать
                    </label>
                  </div>
                  <div>
                    <label htmlFor="father">
                      <input
                        {...register("representativeType", { required: true })}
                        type="radio"
                        id="father"
                        value="father"
                      />
                      Отец
                    </label>
                  </div>
                  <div>
                    <label htmlFor="guardian">
                      <input
                        {...register("representativeType", { required: true })}
                        type="radio"
                        id="guardian"
                        value="guardian"
                      />
                      Опекун
                    </label>
                  </div>
                </div>
                <div>
                  <p>Имя</p>
                  <input
                    {...register("representativeName")}
                    type="text"
                    placeholder="Введите имя"
                    defaultValue={
                      userInfo.representativeName
                        ? userInfo.representativeName
                        : null
                    }
                    required
                  />
                </div>
                <div>
                  <p>Фамилия</p>
                  <input
                    {...register("representativeSurname")}
                    type="text"
                    placeholder="Введите фамилию"
                    defaultValue={
                      userInfo.representativeSurname
                        ? userInfo.representativeSurname
                        : null
                    }
                    required
                  />
                </div>
                <div>
                  <p>Отчество</p>
                  <input
                    {...register("representativePatronymic")}
                    type="text"
                    placeholder="Введите отчество"
                    defaultValue={
                      userInfo.representativePatronymic
                        ? userInfo.representativePatronymic
                        : null
                    }
                    required
                  />
                </div>
                <div>
                  <p>Вид документа</p>
                  <input
                    {...register("representativeDocumentType")}
                    placeholder="Выбрать"
                    defaultValue={
                      userInfo.representativeDocumentType
                        ? userInfo.representativeDocumentType
                        : null
                    }
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Серия</p>
                  <input
                    {...register("representativeDocumentSeries")}
                    defaultValue={
                      userInfo.representativeDocumentSeries
                        ? userInfo.representativeDocumentSeries
                        : null
                    }
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>Номер</p>
                  <input
                    {...register("representativeDocumentNumber")}
                    defaultValue={
                      userInfo.representativeDocumentNumber
                        ? userInfo.representativeDocumentNumber
                        : null
                    }
                    type="text"
                  />
                </div>
                <div>
                  <p>Индентификационный номер</p>
                  <input
                    {...register("representativeIdentificationNumber")}
                    defaultValue={
                      userInfo.representativeIdentificationNumber
                        ? userInfo.representativeIdentificationNumber
                        : null
                    }
                    type="text"
                  />
                </div>
                <div>
                  <p>Эл.почта</p>
                  <input
                    {...register("representativeEmail")}
                    defaultValue={
                      userInfo.representativeEmail
                        ? userInfo.representativeEmail
                        : null
                    }
                    type="email"
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
              <button onClick={() => navigate("/main")}>Назад</button>
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

export default LegalRepresentative;
