import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState } from "../../store/main/reducer";

import ProcessingData from "../../components/ProcessingData";

import "./styled.css";

function PersonalData() {
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
    navigate("/representative");
  };

  return (
    <div className="MainWrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="MainWrapperForm">
        <div className="EmptyDiv" />
        <div className="FormWrapper">
          <div className="FormInner">
            <h2 className="FormInnerTitle">
              Ф.И.О / Дата рождения / Телефон / Email
            </h2>
            <p className="FormInnerText">
              Заполните поля с отметкой * , чтобы перейти к дальнейшему шагу
              вашей регистрации.
            </p>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Имя</p>
                <input
                  {...register("name")}
                  className="InputContent mr30 w172"
                  type="text"
                  placeholder="Введите имя"
                  defaultValue={userInfo.name ? userInfo.name : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Фамилия</p>
                <input
                  {...register("surname")}
                  className="InputContent mr30 w266"
                  type="text"
                  placeholder="Введите фамилию"
                  defaultValue={userInfo.surname ? userInfo.surname : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Отчество</p>
                <input
                  {...register("patronymic")}
                  className="InputContent w274"
                  type="text"
                  placeholder="Введите отчество"
                  defaultValue={
                    userInfo.patronymic ? userInfo.patronymic : null
                  }
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Дата рождения</p>
                <input
                  {...register("date")}
                  className="InputContent mr30 w172"
                  type="date"
                  placeholder="дд.мм.гггг"
                  defaultValue={userInfo.date ? userInfo.date : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Телефон</p>
                <input
                  {...register("phone")}
                  className="InputContent mr30 w266"
                  placeholder="Введите номер телефона"
                  defaultValue={userInfo.phone ? userInfo.phone : null}
                  type="tel"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Эл.почта</p>
                <input
                  {...register("email")}
                  className="InputContent DisabledInput w274"
                  defaultValue={"s.dykomenko@gmail.com"}
                  type="email"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="FormInner">
            <h2 className="FormInnerTitle">Место жительста / Место обучения</h2>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Область</p>
                <input
                  {...register("region")}
                  className="InputContent mr30 w172"
                  placeholder="Введите область"
                  defaultValue={userInfo.region ? userInfo.region : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Район</p>
                <input
                  {...register("area")}
                  className="InputContent mr30 w266"
                  placeholder="Введите район"
                  defaultValue={userInfo.area ? userInfo.area : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Населённый пункт</p>
                <input
                  {...register("town")}
                  className="InputContent w274"
                  placeholder="Введите населённый пункт"
                  defaultValue={userInfo.town ? userInfo.town : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Улица (проспект, переулок)</p>
                <input
                  {...register("street")}
                  className="InputContent mr30 w468"
                  placeholder="Введите название улицы, проспекта, переулока"
                  defaultValue={userInfo.street ? userInfo.street : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Дом</p>
                <input
                  {...register("house")}
                  className="InputContent mr25 w73"
                  defaultValue={userInfo.house ? userInfo.house : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Корп.</p>
                <input
                  {...register("frame")}
                  className="InputContent mr25 w73"
                  defaultValue={userInfo.frame ? userInfo.frame : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Кв.</p>
                <input
                  {...register("flat")}
                  className="InputContent w73"
                  defaultValue={userInfo.flat ? userInfo.flat : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Учебное учреждение</p>
                <input
                  {...register("establishment")}
                  className="InputContent w772"
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
            <h2 className="FormInnerTitle">Паспортные данные</h2>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Вид документа</p>
                <input
                  {...register("documentType")}
                  className="InputContent mr30"
                  placeholder="Выбрать"
                  defaultValue={
                    userInfo.documentType ? userInfo.documentType : null
                  }
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Серия</p>
                <input
                  {...register("documentSeries")}
                  className="InputContent mr30"
                  defaultValue={
                    userInfo.documentSeries ? userInfo.documentSeries : null
                  }
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Номер</p>
                <input
                  {...register("documentNumber")}
                  className="InputContent mr30"
                  defaultValue={
                    userInfo.documentNumber ? userInfo.documentNumber : null
                  }
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Индентификационный номер</p>
                <input
                  {...register("identificationNumber")}
                  className="InputContent mr30"
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
        <ProcessingData notFirst={false} btnText="Продолжить" />
      </form>
    </div>
  );
}

export default PersonalData;
