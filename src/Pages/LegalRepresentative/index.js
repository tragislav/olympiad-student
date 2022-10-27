import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState, updateStore } from "../../store/main/reducer";

import ProcessingData from "../../components/ProcessingData";
import PageNavigation from "../../components/PageNavigation";

import "./styled.css";

function LegalRepresentative() {
  const [agreed, setAgreed] = useState(false);

  const passport = useSelector(
    (state) => state.main.legalRepresentative.passport
  );
  const person = useSelector((state) => state.main.legalRepresentative.person);
  // const legalRepresentative = useSelector(
  //   (state) => state.main.legalRepresentative
  // );
  const requestMethod = useSelector((state) => state.info.requestMethod);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    person.agreed ? setAgreed(person.agreed) : setAgreed(false);
  }, [person.agreed]);

  const onSubmit = (inputs) => {
    inputs.legalRepresentative.person.agreed = agreed;
    switch (requestMethod) {
      case "POST":
        dispatch(addToStore(inputs));
        dispatch(addToState());
        navigate("/specialty");
        break;
      case "PUT":
        // dispatch(updateStore(inputs));
        // dispatch(addToState());
        navigate("/specialty");
        break;
      default:
        dispatch(addToStore(inputs));
        dispatch(addToState());
        navigate("/specialty");
        break;
    }
  };

  return (
    <div className="MainWrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="MainWrapperForm">
        <div className="EmptyDiv" />
        <div className="FormWrapper">
          <PageNavigation pageNumber={2} />
          <div className="FormInner">
            <h2 className="FormInnerTitle">
              Личные данные законного представителя
            </h2>
            <p className="FormInnerText">
              Если вам есть 18 лет, введите свои данные повторно.
            </p>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Фамилия</p>
                <input
                  {...register("legalRepresentative.person.surname")}
                  className="InputContent mr30 w266"
                  type="text"
                  placeholder="Введите фамилию"
                  defaultValue={person.surname ? person.surname : null}
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Имя</p>
                <input
                  {...register("legalRepresentative.person.name")}
                  className="InputContent mr30 w172"
                  type="text"
                  placeholder="Введите имя"
                  defaultValue={person.name ? person.name : null}
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>

              <div className="InputWrapper">
                <p className="InputTitle">Отчество</p>
                <input
                  {...register("legalRepresentative.person.patronymic")}
                  className="InputContent w274"
                  type="text"
                  placeholder="Введите отчество"
                  defaultValue={person.patronymic ? person.patronymic : null}
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Телефон</p>
                <InputMask
                  {...register("legalRepresentative.person.phoneNumber")}
                  mask="+375 (99) 999-99-99"
                  className="InputContent w266"
                  defaultValue={person.phoneNumber ? person.phoneNumber : null}
                  type="tel"
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>
            </div>
            <h2 className="FormInnerTitle">
              Паспортные данные законного представителя (только латиница)
            </h2>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Серия</p>
                <InputMask
                  {...register("legalRepresentative.passport.series")}
                  mask="aa"
                  style={{ textTransform: "uppercase" }}
                  className="InputContent mr30 w91"
                  defaultValue={passport.series ? passport.series : null}
                  type="text"
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Номер</p>
                <InputMask
                  {...register("legalRepresentative.passport.number")}
                  mask="9999999"
                  className="InputContent mr30 w145"
                  defaultValue={passport.number ? passport.number : null}
                  type="text"
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Индентификационный номер</p>
                <input
                  {...register(
                    "legalRepresentative.passport.identificationNumber"
                  )}
                  minLength={14}
                  maxLength={14}
                  style={{ textTransform: "uppercase" }}
                  className="InputContent mr30 w274"
                  defaultValue={
                    passport.identificationNumber
                      ? passport.identificationNumber
                      : null
                  }
                  type="text"
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
              </div>
            </div>

            <div className="RepresentativeAgree">
              <label htmlFor="representativeAgree" className="ProcessingText">
                <input
                  className="RadioItem"
                  type="checkbox"
                  name="representativeAgree"
                  value="a"
                  defaultChecked={person.agreed ? true : false}
                  onChange={() => setAgreed(!agreed)}
                  disabled={requestMethod === "PUT" ? true : false}
                  required
                />
                Я потверждаю, что являюсь законным представителем
                несовершеннолетнего участника олимпиады и даю согласие на
                обработку его и моих персональных данных.
              </label>
            </div>
          </div>
        </div>
        <ProcessingData notFirst={true} btnText="Продолжить" backTo="/main" />
      </form>
    </div>
  );
}

export default LegalRepresentative;
