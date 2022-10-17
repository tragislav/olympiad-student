import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addToState } from "../../store/main/reducer";
import { getSpecialties } from "../../store/info/reducer";

import ProcessingData from "../../components/ProcessingData";
import SpecialtyItem from "./SpecialtyItem";

import "./styled.css";
import { _transformEnrollee } from "../../helpers/transformResults";
import { postEnrolleesData, putUserEnrollee } from "../../api/enrollee";

function ChooseSpecialty() {
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

  const onSubmit = () => {
    console.log(requestMethod);
    console.log(JSON.stringify(_transformEnrollee(userInfo)));
    // dispatch(addToState());
    switch (requestMethod) {
      case "POST":
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
      case "PUT":
        console.log(JSON.stringify(_transformEnrollee(userInfo)));
        putUserEnrollee(
          sessionStorage.getItem("username"),
          sessionStorage.getItem("password"),
          _transformEnrollee(userInfo)
        )
          .then(() => alert("Данные обновлены!"))
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
    if (userSpecialties.length) {
      return arr.findIndex((item) => item.value === rrr[number].value);
    } else {
      return null;
    }
  }

  return (
    <div className="MainWrapper">
      {userSpecialties && specialties && (
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
              <SpecialtyItem
                specialties={specialties}
                number={0}
                defaultValue={indexOfSpec(specialties, userSpecialties, 0)}
              />
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

export default ChooseSpecialty;
