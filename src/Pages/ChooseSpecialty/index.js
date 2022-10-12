import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { addToStore, addToState } from "../../store/main/reducer";

import ProcessingData from "../../components/ProcessingData";

import "./styled.css";

function ChooseSpecialty() {
  const userInfo = useSelector((state) => state.main.info);

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (inputs) => {
    console.log(inputs);
    dispatch(addToStore(inputs));
    dispatch(addToState());
  };

  return (
    <div className="MainWrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="MainWrapperForm">
        <div className="EmptyDiv" />
        <div className="FormWrapper">
          <div className="FormInner">
            <h2 className="FormInnerTitle">Выбор специальности</h2>
            <p className="FormInnerText">
              У вас есть возможность выбрать две специальности, для того что
              добавить вторую специальности необходимо заполнить первую
              специальность и нажать на кнопку «Добавить специальность»
            </p>
            <div className="FormInnerContent">
              <div className="InputWrapper">
                <p className="InputTitle">Наименование специальности №1</p>
                <input
                  {...register("specialtyName")}
                  className="InputContent mr30 w546"
                  type="text"
                  placeholder="Выберите специальность"
                  defaultValue={
                    userInfo.specialtyName ? userInfo.specialtyName : null
                  }
                  required
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Код специальности</p>
                <input
                  className="InputContent w196"
                  type="text"
                  defaultValue={"6-05-0713-04"}
                  disabled
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Учебный предмет по олимпиаде</p>
                <input
                  type="text"
                  className="InputContent mr30 w546"
                  defaultValue={"Математика"}
                  disabled
                />
              </div>
              <div className="InputWrapper">
                <p className="InputTitle">Кол-во мест</p>
                <input
                  type="text"
                  className="InputContent w116"
                  defaultValue={"10"}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <ProcessingData
          notFirst={true}
          btnText="Зарегистрироваться"
          backTo="/representative"
        />
      </form>
    </div>
  );
}

export default ChooseSpecialty;
