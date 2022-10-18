import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState, updateStore } from "../../store/main/reducer";

import "./styled.css";
import ProcessingData from "../../components/ProcessingData";
import { useEffect, useState } from "react";

function LegalRepresentative() {
  const [agreed, setAgreed] = useState(false);

  const passport = useSelector(
    (state) => state.main.legalRepresentative.passport
  );
  const person = useSelector((state) => state.main.legalRepresentative.person);
  const legalRepresentative = useSelector(
    (state) => state.main.legalRepresentative
  );
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
        dispatch(updateStore(inputs));
        dispatch(addToState());
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
          <div className="FormInner">
            {/* <div className="RepresentativeType">
              <h3 className="FormInnerTitle">Выбрать:</h3>
              <div className="RepresentativeTypeItem">
                <input
                  {...register(
                    "legalRepresentative.person.representativeType",
                    { required: true }
                  )}
                  defaultChecked={
                    person.representativeType === "mother" ? true : false
                  }
                  className="RadioItem"
                  type="radio"
                  id="mother"
                  value="mother"
                  required
                />
                <label htmlFor="mother">Мать</label>
              </div>
              <div className="RepresentativeTypeItem">
                <input
                  {...register(
                    "legalRepresentative.person.representativeType",
                    { required: true }
                  )}
                  defaultChecked={
                    person.representativeType === "father" ? true : false
                  }
                  className="RadioItem"
                  type="radio"
                  id="father"
                  value="father"
                  required
                />
                <label htmlFor="father">Отец</label>
              </div>
              <div className="RepresentativeTypeItem">
                <input
                  {...register(
                    "legalRepresentative.person.representativeType",
                    { required: true }
                  )}
                  default={
                    person.representativeType === "guardian" ? true : false
                  }
                  className="RadioItem"
                  type="radio"
                  id="guardian"
                  value="guardian"
                  required
                />
                <label htmlFor="guardian">Опекун</label>
              </div>
            </div> */}
            <h2 className="FormInnerTitle">Личные данные представителя</h2>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Имя</p>
                <input
                  {...register("legalRepresentative.person.name")}
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
                  {...register("legalRepresentative.person.surname")}
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
                  {...register("legalRepresentative.person.patronymic")}
                  className="InputContent w274"
                  type="text"
                  placeholder="Введите отчество"
                  defaultValue={person.patronymic ? person.patronymic : null}
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Телефон</p>
                <input
                  {...register("legalRepresentative.person.phoneNumber")}
                  className="InputContent w266"
                  defaultValue={person.phoneNumber ? person.phoneNumber : null}
                  type="tel"
                />
              </div>
            </div>
            <h2 className="FormInnerTitle">Паспортные данные представителя</h2>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Серия</p>
                <input
                  {...register("legalRepresentative.passport.series")}
                  className="InputContent mr30 w91"
                  defaultValue={passport.series ? passport.series : null}
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Номер</p>
                <input
                  {...register("legalRepresentative.passport.number")}
                  className="InputContent mr30 w145"
                  defaultValue={passport.number ? passport.number : null}
                  type="text"
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Индентификационный номер</p>
                <input
                  {...register(
                    "legalRepresentative.passport.identificationNumber"
                  )}
                  className="InputContent mr30 w274"
                  defaultValue={
                    passport.identificationNumber
                      ? passport.identificationNumber
                      : null
                  }
                  type="text"
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
