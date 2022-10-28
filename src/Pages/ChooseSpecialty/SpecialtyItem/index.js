import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import merge from "lodash/merge";

import { addSpecialty } from "../../../store/main/reducer";

import "./styled.css";

function SpecialtyItem({ specialties, number, defaultValue, disabled }) {
  const [componentSpecialties, setComponentSpecialties] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  useEffect(() => {
    // if (defaultValue && Object.keys(componentSpecialties).length === 0) {
    //   console.log(specialties[defaultValue], number, "useEffect");
    //   setComponentSpecialties(() =>
    //     merge(componentSpecialties, specialties[defaultValue])
    //   );
    // }
    setComponentSpecialties(() =>
      merge(componentSpecialties, specialties[defaultValue])
    );
    setLoading(true);
  }, [componentSpecialties, defaultValue, number, specialties]);

  function specialtyToStore(item, number) {
    const { label, value, code, subjectName, seatsNumber } = item;
    setComponentSpecialties(item);
    console.log(
      { id: value, name: label, code, subjectName, seatsNumber, value },
      "specialtyToStore"
    );
    dispatch(
      addSpecialty({
        number,
        spec: { id: value, name: label, code, subjectName, seatsNumber, value },
      })
    );
  }

  return (
    loading && (
      <div className="FormInnerContent">
        <div className="InputWrapper w100proc">
          <p className="InputTitle">Наименование специальности №{number + 1}</p>
          <Select
            className="SelectContent"
            placeholder={
              <div className="SelectPlaceholder">Выберите специальность</div>
            }
            options={specialties}
            onChange={(item) => specialtyToStore(item, number)}
            defaultValue={specialties[defaultValue]}
            isDisabled={disabled}
          />
        </div>
        <div className="InputWrapper">
          <p className="InputTitle">Код специальности</p>
          <input
            className="InputContent mr30 w196"
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
            className="InputContent w546"
            defaultValue={
              componentSpecialties.subjectName
                ? componentSpecialties.subjectName
                : null
            }
            disabled
          />
        </div>
        {/* <div className="InputWrapper">
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
        </div> */}
      </div>
    )
  );
}

export default SpecialtyItem;
