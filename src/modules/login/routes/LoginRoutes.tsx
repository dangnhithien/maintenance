// src/modules/maintenance/routes/MaintenanceRo
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

const LoginRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default LoginRoutes;
