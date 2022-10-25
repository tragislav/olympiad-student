import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import Login from "./Pages/Login";
import PasswordRecovery from "./Pages/PasswordRecovery";
import Registration from "./Pages/Registration";
import PersonalData from "./Pages/PersonalData";
import LegalRepresentative from "./Pages/LegalRepresentative";
import ChooseSpecialty from "./Pages/ChooseSpecialty";
import ChangePassword from "./Pages/ChangePassword";
import RequireAuth from "./components/HOCs/RequireAuth";

import { getEnrolleeByUsername } from "./api/enrollee";
import { addToStore, addToState } from "./store/main/reducer";
import { getEstablishments, updateRequestMethod } from "./store/info/reducer";
import { _transformSpecialty } from "./helpers/transformResults";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const loading = useSelector((state) => state.info.wait);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEstablishments());
    if (isLogin && !loading) {
      getEnrolleeByUsername(
        sessionStorage.getItem("username"),
        sessionStorage.getItem("password")
      )
        .then((data) => {
          dispatch(updateRequestMethod("PUT"));
          dispatch(
            addToStore({
              birthday: data.birthday,
              educationalEstablishment: data.educationalEstablishment,
              id: data.id,
              legalRepresentative: data.legalRepresentative,
              mainAddress: data.mainAddress,
              passport: data.passport,
              person: data.person,
              specialities: data.specialities.map(_transformSpecialty),
              user: data.user,
              userSDOS: data.userSDOS,
            })
          );
          dispatch(addToState());
          setTimeout(() => setIsLoading(true), 1000);
        })
        .catch((e) => {
          setIsLoading(true);
          dispatch(updateRequestMethod("POST"));
          console.error(e);
        });
    }
  }, [dispatch, isLogin, loading]);

  function loginStatus() {
    return setIsLogin(true);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login loginStatus={loginStatus} />} />
        <Route path="registration" element={<Registration />} />
        <Route path="passwordRecovery" element={<PasswordRecovery />} />
        <Route
          path="main"
          element={
            <RequireAuth>
              {isLoading ? <PersonalData /> : <Loader />}
            </RequireAuth>
          }
        />
        <Route
          path="representative"
          element={
            <RequireAuth>
              {isLoading ? <LegalRepresentative /> : <Loader />}
            </RequireAuth>
          }
        />
        <Route
          path="specialty"
          element={
            <RequireAuth>
              {isLoading ? <ChooseSpecialty /> : <Loader />}
            </RequireAuth>
          }
        />
        <Route path="changePassword/uid=:uid" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default App;
