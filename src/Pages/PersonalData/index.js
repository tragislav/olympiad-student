import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

import {
  addToStore,
  addToState,
  updateStore,
  addEstablishment,
} from "../../store/main/reducer";

import ProcessingData from "../../components/ProcessingData";
import PageNavigation from "../../components/PageNavigation";
import MenuList from "../../components/MenuList";

import "./styled.css";

function PersonalData() {
  const userInfo = useSelector((state) => state.main);
  const person = useSelector((state) => state.main.person);
  const mainAddress = useSelector((state) => state.main.mainAddress);
  const address = useSelector((state) => state.main.mainAddress.address);
  const establishments = useSelector(
    (state) => state.info.educationalEstablishment
  );
  const educationalEstablishment = useSelector(
    (state) => state.main.educationalEstablishment
  );
  const passport = useSelector((state) => state.main.passport);
  const email = JSON.parse(sessionStorage.getItem("user")).email;
  const requestMethod = useSelector((state) => state.info.requestMethod);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (inputs) => {
    console.log(inputs);
    const user = JSON.parse(sessionStorage.getItem("user"));
    switch (requestMethod) {
      case "POST":
        dispatch(addToStore({ ...inputs, user }));
        dispatch(addToState());
        navigate("/representative");
        break;
      case "PUT":
        dispatch(updateStore({ ...inputs, user }));
        dispatch(addToState());
        navigate("/representative");
        break;
      default:
        dispatch(addToStore({ ...inputs, user }));
        dispatch(addToState());
        navigate("/representative");
        break;
    }
  };

  function indexOfSchool(arr, rrr) {
    if (Object.keys(educationalEstablishment)) {
      return arr.findIndex((item) => item.id === rrr.id);
    } else {
      return null;
    }
  }

  return (
    <div className="MainWrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="MainWrapperForm">
        <div className="EmptyDiv" />
        <div className="FormWrapper">
          <PageNavigation pageNumber={1} />
          <div className="FormInner">
            <h2 className="FormInnerTitle">
              Ф.И.О / Дата рождения / Телефон / Email
            </h2>
            <p className="FormInnerText">
              Заполните все поля, чтобы перейти к дальнейшему шагу вашей
              регистрации.
            </p>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Имя</p>
                <input
                  {...register("person.name")}
                  className="InputContent mr30 w172"
                  type="text"
                  placeholder="Введите имя"
                  defaultValue={person.name ? person.name : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Фамилия</p>
                <input
                  {...register("person.surname")}
                  className="InputContent mr30 w266"
                  type="text"
                  placeholder="Введите фамилию"
                  defaultValue={person.surname ? person.surname : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Отчество</p>
                <input
                  {...register("person.patronymic")}
                  className="InputContent w274"
                  type="text"
                  placeholder="Введите отчество"
                  defaultValue={person.patronymic ? person.patronymic : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Дата рождения</p>
                <input
                  {...register("birthday")}
                  className="InputContent mr30 w172"
                  type="date"
                  placeholder="дд.мм.гггг"
                  defaultValue={userInfo.birthday ? userInfo.birthday : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Телефон</p>
                <input
                  {...register("person.phoneNumber")}
                  className="InputContent mr30 w266"
                  placeholder="Введите номер телефона"
                  defaultValue={person.phoneNumber ? person.phoneNumber : null}
                  type="tel"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Эл.почта</p>
                <input
                  className="InputContent w274"
                  defaultValue={email}
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
                  {...register("mainAddress.address.region")}
                  className="InputContent mr30 w172"
                  placeholder="Введите область"
                  defaultValue={address.region ? address.region : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Район</p>
                <input
                  {...register("mainAddress.address.district")}
                  className="InputContent mr30 w266"
                  placeholder="Введите район"
                  defaultValue={address.district ? address.district : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Населённый пункт</p>
                <input
                  {...register("mainAddress.address.locality")}
                  className="InputContent w274"
                  placeholder="Введите населённый пункт"
                  defaultValue={address.locality ? address.locality : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Улица (проспект, переулок)</p>
                <input
                  {...register("mainAddress.street")}
                  className="InputContent mr30 w468"
                  placeholder="Введите название улицы, проспекта, переулока"
                  defaultValue={mainAddress.street ? mainAddress.street : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Дом</p>
                <input
                  {...register("mainAddress.house")}
                  className="InputContent mr25 w73"
                  defaultValue={mainAddress.house ? mainAddress.house : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Корп.</p>
                <input
                  {...register("mainAddress.frame")}
                  className="InputContent mr25 w73"
                  defaultValue={mainAddress.frame ? mainAddress.frame : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Кв.</p>
                <input
                  {...register("mainAddress.flat")}
                  className="InputContent w73"
                  defaultValue={mainAddress.flat ? mainAddress.flat : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper w100proc">
                <p className="InputTitle">Учебное учреждение</p>
                <Select
                  className="EducationSelect"
                  placeholder={
                    <div className="SelectPlaceholder">
                      Выберите учебное учреждение
                    </div>
                  }
                  onChange={(item) => dispatch(addEstablishment(item))}
                  components={{ MenuList }}
                  defaultValue={
                    establishments[
                      indexOfSchool(establishments, educationalEstablishment)
                    ]
                  }
                  options={establishments}
                />
              </div>
            </div>
          </div>
          <div className="FormInner">
            <h2 className="FormInnerTitle">Паспортные данные</h2>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Серия</p>
                <input
                  {...register("passport.series")}
                  className="InputContent mr25 w91"
                  defaultValue={passport.series ? passport.series : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Номер</p>
                <input
                  {...register("passport.number")}
                  className="InputContent mr25 w155"
                  defaultValue={passport.number ? passport.number : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Индентификационный номер</p>
                <input
                  {...register("passport.identificationNumber")}
                  className="InputContent w274"
                  defaultValue={
                    passport.identificationNumber
                      ? passport.identificationNumber
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
