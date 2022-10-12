import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState } from "../../store/main/reducer";

import "./styled.css";
import ProcessingData from "../../components/ProcessingData";

function LegalRepresentative() {
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

  return (
    <div className="MainWrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="MainWrapperForm">
        <div className="EmptyDiv" />
        <div className="FormWrapper">
          <div className="FormInner">
            <div className="RepresentativeType">
              <h3 className="FormInnerTitle">Выбрать:</h3>
              <div className="RepresentativeTypeItem">
                <input
                  {...register("representativeType", { required: true })}
                  className="RadioItem"
                  type="radio"
                  id="mother"
                  value="mother"
                />
                <label htmlFor="mother">Мать</label>
              </div>
              <div className="RepresentativeTypeItem">
                <input
                  {...register("representativeType", { required: true })}
                  className="RadioItem"
                  type="radio"
                  id="father"
                  value="father"
                />
                <label htmlFor="father">Отец</label>
              </div>
              <div className="RepresentativeTypeItem">
                <input
                  {...register("representativeType", { required: true })}
                  className="RadioItem"
                  type="radio"
                  id="guardian"
                  value="guardian"
                />
                <label htmlFor="guardian">Опекун</label>
              </div>
            </div>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Имя</p>
                <input
                  {...register("representativeName")}
                  className="InputContent mr30 w172"
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
              <div className="InputWrapper">
                <p className="InputTitle">Фамилия</p>
                <input
                  {...register("representativeSurname")}
                  className="InputContent mr30 w266"
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
              <div className="InputWrapper">
                <p className="InputTitle">Отчество</p>
                <input
                  {...register("representativePatronymic")}
                  className="InputContent w274"
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
              <div className="InputWrapper">
                <p className="InputTitle">Вид документа</p>
                <input
                  {...register("representativeDocumentType")}
                  className="InputContent mr30 w172"
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
              <div className="InputWrapper">
                <p className="InputTitle">Серия</p>
                <input
                  {...register("representativeDocumentSeries")}
                  className="InputContent mr30 w91"
                  defaultValue={
                    userInfo.representativeDocumentSeries
                      ? userInfo.representativeDocumentSeries
                      : null
                  }
                  type="text"
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Номер</p>
                <input
                  {...register("representativeDocumentNumber")}
                  className="InputContent mr30 w145"
                  defaultValue={
                    userInfo.representativeDocumentNumber
                      ? userInfo.representativeDocumentNumber
                      : null
                  }
                  type="text"
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Индентификационный номер</p>
                <input
                  {...register("representativeIdentificationNumber")}
                  className="InputContent w274"
                  defaultValue={
                    userInfo.representativeIdentificationNumber
                      ? userInfo.representativeIdentificationNumber
                      : null
                  }
                  type="text"
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Телефон</p>
                <input
                  {...register("representativePhone")}
                  className="InputContent w266"
                  defaultValue={
                    userInfo.representativePhone
                      ? userInfo.representativePhone
                      : null
                  }
                  type="tel"
                />
              </div>
            </div>
            <div className="RepresentativeAgree">
              <label htmlFor="representativeAgree" className="ProcessingText">
                <input
                  style={{ marginRight: "15px" }}
                  {...register("representativeAgree")}
                  className="RadioItem"
                  type="checkbox"
                  name="representativeAgree"
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
