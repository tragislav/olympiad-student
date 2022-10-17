import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";

import { addSpecialty } from "../../../store/main/reducer";

import "./styled.css";

function SpecialtyItem({ specialties, number, defaultValue }) {
  const [componentSpecialties, setComponentSpecialties] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultValue && Object.keys(componentSpecialties).length === 0) {
      setComponentSpecialties(specialties[defaultValue]);
    }
  }, [componentSpecialties, defaultValue, specialties]);

  function specialtyToStore(item, number) {
    const { label, value, code, subjectName, seatsNumber } = item;
    setComponentSpecialties(item);
    dispatch(
      addSpecialty({
        number,
        spec: { id: value, name: label, code, subjectName, seatsNumber },
      })
    );
  }

  return (
    <div className="FormInnerContent">
      <div className="InputWrapper">
        <p className="InputTitle">Наименование специальности №{number + 1}</p>
        {specialties & defaultValue ? (
          <Select
            className="SelectContent"
            placeholder={
              <div className="SelectPlaceholder">Выберите специальность</div>
            }
            options={specialties}
            onChange={(item) => specialtyToStore(item, number)}
            defaultValue={specialties[defaultValue]}
            required
          />
        ) : (
          <Select
            className="SelectContent"
            placeholder={
              <div className="SelectPlaceholder">Выберите специальность</div>
            }
            options={specialties}
            onChange={(item) => specialtyToStore(item, number)}
            defaultValue={specialties[defaultValue]}
            required
          />
        )}
      </div>
      <div className="InputWrapper">
        <p className="InputTitle">Код специальности</p>
        <input
          className="InputContent w196"
          type="text"
          defaultValue={
            componentSpecialties.code ? componentSpecialties.code : null
          }
          disabled
        />
      </div>
      <div className="InputWrapper">
        <p className="InputTitle">Учебный предмет по олимпиаде</p>
        <input
          type="text"
          className="InputContent mr30 w546"
          defaultValue={
            componentSpecialties.subjectName
              ? componentSpecialties.subjectName
              : null
          }
          disabled
        />
      </div>
      <div className="InputWrapper">
        <p className="InputTitle">Кол-во мест</p>
        <input
          type="text"
          className="InputContent w116"
          defaultValue={
            componentSpecialties.seatsNumber
              ? componentSpecialties.seatsNumber
              : null
          }
          disabled
        />
      </div>
    </div>
  );
}

export default SpecialtyItem;
