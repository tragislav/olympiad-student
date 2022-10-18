import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState, updateStore } from "../../store/main/reducer";

import ProcessingData from "../../components/ProcessingData";

import { getEnrolleeByUsername } from "../../api/enrollee";
import { _transformSpecialty } from "../../helpers/transformResults";

import "./styled.css";

function PersonalData() {
  const userInfo = useSelector((state) => state.main);
  const person = useSelector((state) => state.main.person);
  const mainAddress = useSelector((state) => state.main.mainAddress);
  const address = useSelector((state) => state.main.mainAddress.address);
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

  // useEffect(() => {
  //   getEnrolleeByUsername(
  //     sessionStorage.getItem("username"),
  //     sessionStorage.getItem("password")
  //   )
  //     .then((data) => {
  //       dispatch(
  //         addToStore({
  //           birthday: data.birthday,
  //           educationalEstablishment: data.educationalEstablishment,
  //           id: data.id,
  //           legalRepresentative: data.legalRepresentative,
  //           mainAddress: data.mainAddress,
  //           passport: data.passport,
  //           person: data.person,
  //           specialities: data.specialities.map(_transformSpecialty),
  //           user: data.user,
  //           userSDOS: data.userSDOS,
  //         })
  //       );
  //       dispatch(addToState());
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [dataLoading, dispatch]);

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
              <div className="InputWrapper">
                <p className="InputTitle">Учебное учреждение</p>
                <input
                  {...register("educationalEstablishment.name")}
                  className="InputContent w772"
                  placeholder="Выберите учебное учреждение"
                  defaultValue={
                    educationalEstablishment.name
                      ? educationalEstablishment.name
                      : null
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
                  {...register("passport.documentType")}
                  className="InputContent mr25 w172"
                  placeholder="Выбрать"
                  defaultValue={
                    passport.documentType ? passport.documentType : null
                  }
                  type="text"
                  required
                />
              </div>
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
