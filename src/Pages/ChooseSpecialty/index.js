import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../../hooks/useAuth";

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
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const { handleSubmit } = useForm();

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

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
        // putUserEnrollee(
        //   sessionStorage.getItem("username"),
        //   sessionStorage.getItem("password"),
        //   _transformEnrollee(userInfo)
        // )
        //   .then(() => setIsSuccess(true))
        //   .catch((e) => {
        //     console.error(e);
        //     alert("Данные не обновлены!");
        //   });
        signOut(() => {
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("password");
          sessionStorage.removeItem("user");
          navigate("/");
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

  const indexOfSpec = (arr, obj, number) => {
    if (userSpecialties[number]) {
      return arr.findIndex((item) => item.value === obj.value);
    } else {
      return null;
    }
  };

  function deleteSecondSpecialty() {
    setSecondSpec(false);
    dispatch(deleteSpecialty());
  }

  if (isSuccess) {
    return (
      <RegistrationSuccess
        text="Спасибо, вы зарегистрированы для участия в олимпиаде, письмо с инструкциями 
отправлено вам на почту, указанную при регистрации."
        nav="/"
        logout={true}
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
                  Вы можете выбрать не более двух специальностей для участия в
                  предварительном этапе Олимпиады.
                </p>
                <SpecialtyItem
                  specialties={specialties}
                  number={0}
                  defaultValue={indexOfSpec(specialties, userSpecialties[0], 0)}
                  disabled={requestMethod === "PUT" ? true : false}
                />
                {secondSpec ? (
                  <>
                    <SpecialtyItem
                      specialties={specialties}
                      number={1}
                      defaultValue={indexOfSpec(
                        specialties,
                        userSpecialties[1],
                        1
                      )}
                      disabled={requestMethod === "PUT" ? true : false}
                    />
                    <div className="FormInnerContent">
                      <div className="InputWrapper">
                        <button
                          type="button"
                          className="SpecSubmit"
                          onClick={() => deleteSecondSpecialty()}
                          disabled={requestMethod === "PUT" ? true : false}
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
                        disabled={requestMethod === "PUT" ? true : false}
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
              btnText={requestMethod === "PUT" ? "Выйти" : "Зарегистрироваться"}
              backTo="/representative"
            />
          </form>
        )}
      </div>
    );
  }
}

export default ChooseSpecialty;
