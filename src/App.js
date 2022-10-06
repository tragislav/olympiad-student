import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./Pages/Login";
import PasswordRecovery from "./Pages/PasswordRecovery";
import PersonalData from "./Pages/PersonalData";
import Registration from "./Pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="passwordRecovery" element={<PasswordRecovery />} />
          <Route path="main" element={<PersonalData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
