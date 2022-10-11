import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState } from "../../store/main/reducer";

import "./styled.css";

function ChooseSpecialty() {
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
              <h2>Выбор специальности</h2>
              <p>
                У вас есть возможность выбрать две специальности, для того что
                добавить вторую специальности необходимо заполнить первую
                специальность и нажать на кнопку «Добавить специальность»
              </p>
              <div>
                <div>
                  <p>Наименование специальности №1</p>
                  <input
                    {...register("specialtyName")}
                    type="text"
                    placeholder="Выберите специальность"
                    defaultValue={
                      userInfo.specialtyName ? userInfo.specialtyName : null
                    }
                    required
                  />
                </div>
                <div>
                  <p>Код специальности</p>
                  <input type="text" defaultValue={"6-05-0713-04"} disabled />
                </div>
                <div>
                  <p>Учебный предмет по олимпиаде</p>
                  <input type="text" defaultValue={"Математика"} disabled />
                </div>
                <div>
                  <p>Кол-во мест</p>
                  <input type="text" defaultValue={"10"} disabled />
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
              <button onClick={() => navigate("/representative")}>Назад</button>
              <button type="submit" disabled={disable}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChooseSpecialty;
