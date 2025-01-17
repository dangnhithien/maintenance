// src/modules/maintenance/routes/MaintenanceRoutes.tsx
import SurveyPage from "@modules/maintenance/pages/survey/SurveyPage";
import { Route, Routes } from "react-router-dom";

const LoginRoutes = () => (
  <Routes>
    <Route path="/login" element={<SurveyPage />} />
  </Routes>
);

export default LoginRoutes;
