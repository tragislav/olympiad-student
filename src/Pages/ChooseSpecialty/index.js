import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addToState, deleteSpecialty } from "../../store/main/reducer";
import { getSpecialties } from "../../store/info/reducer";

import { _transformEnrollee } from "../../helpers/transformResults";
import { postEnrolleesData, putUserEnrollee } from "../../api/enrollee";

import ProcessingData from "../../components/ProcessingData";
import PageNavigation from "../../components/PageNavigation";
import SpecialtyItem from "./SpecialtyItem";
import RegistrationSuccess from "../../components/RegistrationSuccess";

import "./styled.css";

function ChooseSpecialty() {
  const [secondSpec, setSecondSpec] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const specialties = useSelector((state) => state.info.specialties);
  const requestMethod = useSelector((state) => state.info.requestMethod);
  const userInfo = useSelector((state) => state.main);
  const userSpecialties = useSelector((state) => state.main.specialities);

  const dispatch = useDispatch();

  const { handleSubmit } = useForm();

  useEffect(() => {
    dispatch(
      getSpecialties(
        sessionStorage.getItem("username"),
        sessionStorage.getItem("password")
      )
    );
  }, [dispatch]);

  useEffect(() => {
    userSpecialties.length === 2 ? setSecondSpec(true) : setSecondSpec(false);
    switch (userSpecialties.length) {
      case 2:
        break;
      default:
        break;
    }
  }, [userSpecialties.length]);

  const onSubmit = () => {
    dispatch(addToState());
    switch (requestMethod) {
      case "POST":
        postEnrolleesData(
          sessionStorage.getItem("username"),
          sessionStorage.getItem("password"),
          _transformEnrollee(userInfo)
        )
          .then(() => setIsSuccess(true))
          .catch((e) => {
            console.error(e);
            alert("Данные не добавлены!");
          });
        break;
      case "PUT":
        putUserEnrollee(
          sessionStorage.getItem("username"),
          sessionStorage.getItem("password"),
          _transformEnrollee(userInfo)
        )
          .then(() => setIsSuccess(true))
          .catch((e) => {
            console.error(e);
            alert("Данные не обновлены!");
          });
        break;
      default:
        postEnrolleesData(
          sessionStorage.getItem("username"),
          sessionStorage.getItem("password"),
          _transformEnrollee(userInfo)
        )
          .then(() => alert("Данные добавлены!"))
          .catch((e) => {
            console.error(e);
            alert("Данные не добавлены!");
          });
        break;
    }
  };

  function indexOfSpec(arr, rrr, number) {
    if (userSpecialties[number]) {
      return arr.findIndex((item) => item.value === rrr[number].value);
    } else {
      return null;
    }
  }

  function deleteSecondSpecialty() {
    setSecondSpec(false);
    dispatch(deleteSpecialty());
  }

  if (isSuccess) {
    return (
      <RegistrationSuccess
        text="Спасибо, вы зарегистрированы для участия в олимпиаде, письмо с инструкциями 
отправлено вам на почту указанную при регистрации."
        nav="/main"
      />
    );
  } else {
    return (
      <div className="MainWrapper">
        {specialties && (
          <form onSubmit={handleSubmit(onSubmit)} className="MainWrapperForm">
            <div className="EmptyDiv" />
            <div className="FormWrapper">
              <PageNavigation pageNumber={3} />
              <div className="FormInner">
                <h2 className="FormInnerTitle">Выбор специальности</h2>
                <p className="FormInnerText">
                  У вас есть возможность выбрать две специальности, для того что
                  добавить вторую специальности необходимо заполнить первую
                  специальность и нажать на кнопку «Добавить специальность»
                </p>
                <SpecialtyItem
                  specialties={specialties}
                  number={0}
                  defaultValue={indexOfSpec(specialties, userSpecialties, 0)}
                />
                {secondSpec ? (
                  <>
                    <SpecialtyItem
                      specialties={specialties}
                      number={1}
                      defaultValue={indexOfSpec(
                        specialties,
                        userSpecialties,
                        1
                      )}
                    />
                    <div className="FormInnerContent">
                      <div className="InputWrapper">
                        <button
                          type="button"
                          className="SpecSubmit"
                          onClick={() => deleteSecondSpecialty()}
                        >
                          Удалить вторую специальность
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="FormInnerContent">
                    <div className="InputWrapper">
                      <button
                        type="button"
                        className="SpecSubmit"
                        onClick={() => setSecondSpec(true)}
                      >
                        Добавить специальность
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ProcessingData
              notFirst={true}
              btnText="Зарегистрироваться"
              backTo="/representative"
            />
          </form>
        )}
      </div>
    );
  }
}

export default ChooseSpecialty;
