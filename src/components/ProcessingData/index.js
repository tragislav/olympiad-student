import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setPrivacyPolicy,
  setDataProcessing,
} from "../../store/processing/reducer";

import "./styled.css";

function ProcessingData({ notFirst, btnText, backTo }) {
  const [disable, setDisable] = useState(true);

  const person = useSelector((state) => state.main.person);
  const dataProcessing = useSelector(
    (state) => state.processing.dataProcessing
  );
  const privacyPolicy = useSelector((state) => state.processing.privacyPolicy);
  const requestMethod = useSelector((state) => state.info.requestMethod);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (person.agreed) {
      dispatch(setPrivacyPolicy(true));
      dispatch(setDataProcessing(true));
    }
  }, [dispatch, person.agreed]);

  useEffect(() => {
    if (privacyPolicy && dataProcessing) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [dataProcessing, privacyPolicy]);

  function _scrollToTop() {
    window.scroll(0, 0);
  }

  return (
    <div className="ProcessingWrapper">
      <div className="ProcessingInner">
        <h2 className="ProcessingTitle">Обработка ваших данных</h2>
        <p className="ProcessingText">
          При создании учетной записи вы подтверждаете, что являетесь учащимся
          11 класса и даете согласие с нашими правилами и условиями пользования
          веб-сервисом
        </p>
        <div className="ProcessingContent">
          <div className="ProcessingLabel">
            <label htmlFor="dataProcessing">
              <input
                className="RadioItem"
                type="checkbox"
                defaultChecked={requestMethod === "PUT" ? true : false}
                name="dataProcessing"
                disabled={requestMethod === "PUT" ? true : false}
              />
              <a
                href="https://vstu.by/"
                style={{ textDecoration: "none", color: "#000000" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Положение об Олимпиаде
              </a>
            </label>
          </div>
          <div className="ProcessingLabel">
            <label htmlFor="privacyPolicy">
              <input
                className="RadioItem"
                type="checkbox"
                name="privacyPolicy"
                checked={privacyPolicy}
                onChange={() => dispatch(setPrivacyPolicy(!privacyPolicy))}
                disabled={requestMethod === "PUT" ? true : false}
              />
              <a
                href="https://multisports.by/info/politika-konfidentsialnosti/"
                style={{ textDecoration: "none", color: "#000000" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Политика конфиденциальности
              </a>
            </label>
          </div>
          <div className="ProcessingLabel">
            <label htmlFor="dataProcessing">
              <input
                className="RadioItem"
                type="checkbox"
                checked={dataProcessing}
                name="dataProcessing"
                onChange={() => dispatch(setDataProcessing(!dataProcessing))}
                disabled={requestMethod === "PUT" ? true : false}
              />
              <a
                href="https://pravo.by/upload/docs/op/H12100099_1620939600.pdf"
                style={{ textDecoration: "none", color: "#000000" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Обработка данных в соответствии с законом о персональных данных
                от 7 мая 2021 г. № 99-3.
              </a>
            </label>
          </div>

          {notFirst ? (
            <div className="ButtonsContainer">
              <button
                className="backBtn"
                onClick={() => {
                  navigate(backTo);
                  _scrollToTop();
                }}
              >
                Назад
              </button>
              <button
                className="ProcessingSubmit anotherBtnState"
                type="submit"
                onClick={() => _scrollToTop()}
                disabled={disable}
              >
                {btnText}
              </button>
            </div>
          ) : (
            <>
              <button
                className="ProcessingSubmit"
                type="submit"
                onClick={() => _scrollToTop()}
                disabled={disable}
              >
                {btnText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessingData;
