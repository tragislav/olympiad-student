import { useEffect, useState } from "react";

import "./styled.css";

function ProcessingData({ notFirst, btnText }) {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    privacyPolicy && dataProcessing ? setDisable(false) : setDisable(true);
  }, [dataProcessing, privacyPolicy]);

  return (
    <div className="ProcessingWrapper">
      <div className="ProcessingInner">
        <h2 className="ProcessingTitle">Обработка ваших данных</h2>
        <p className="ProcessingText">
          При создании учетной записи вы даете согласие с нашими правилами и
          условиями пользования веб-сервисом
        </p>
        <div className="ProcessingContent">
          <div className="ProcessingLabel">
            <label htmlFor="privacyPolicy">
              <input
                style={{ marginRight: "15px" }}
                type="checkbox"
                name="privacyPolicy"
                onChange={() => setPrivacyPolicy(!privacyPolicy)}
              />
              Политика конфиденциальности
            </label>
          </div>
          <div className="ProcessingLabel">
            <label htmlFor="dataProcessing">
              <input
                style={{ marginRight: "15px" }}
                type="checkbox"
                name="dataProcessing"
                onChange={() => setDataProcessing(!dataProcessing)}
              />
              Обработка данных в соответствии с законом о персональных данных от
              7 мая 2021 г. № 99-3.
            </label>
          </div>
          {notFirst ? (
            <>
              <button
                className="ProcessingSubmit"
                type="submit"
                disabled={disable}
              >
                ffff
              </button>
            </>
          ) : (
            <>
              <button
                className="ProcessingSubmit"
                type="submit"
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
