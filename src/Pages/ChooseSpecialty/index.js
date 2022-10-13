import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addToState } from "../../store/main/reducer";
import { getSpecialties } from "../../store/info/reducer";

import ProcessingData from "../../components/ProcessingData";
import SpecialtyItem from "./SpecialtyItem";

import "./styled.css";
import { _transformEnrollee } from "../../helpers/transformResults";
import { postEnrolliesData } from "../../api/enrollee";

function ChooseSpecialty() {
  const specialties = useSelector((state) => state.info.specialties);
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
    // dispatch(addToState());
    console.log(_transformEnrollee(userInfo));
    postEnrolliesData(
      sessionStorage.getItem("username"),
      sessionStorage.getItem("password"),
      _transformEnrollee(userInfo)
    );
    alert("Данные добавлены!");
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
            <SpecialtyItem
              specialties={specialties}
              number={0}
              defaultValue={userSpecialties[0]}
            />
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
