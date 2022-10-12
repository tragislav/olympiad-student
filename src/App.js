import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./Pages/Login";
import PasswordRecovery from "./Pages/PasswordRecovery";
import Registration from "./Pages/Registration";
import PersonalData from "./Pages/PersonalData";
import LegalRepresentative from "./Pages/LegalRepresentative";
import ChooseSpecialty from "./Pages/ChooseSpecialty";
import RequireAuth from "./components/HOCs/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="passwordRecovery" element={<PasswordRecovery />} />
        <Route
          path="main"
          element={
            <RequireAuth>
              <PersonalData />
            </RequireAuth>
          }
        />
        <Route
          path="representative"
          element={
            <RequireAuth>
              <LegalRepresentative />
            </RequireAuth>
          }
        />
        <Route
          path="specialty"
          element={
            <RequireAuth>
              <ChooseSpecialty />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
