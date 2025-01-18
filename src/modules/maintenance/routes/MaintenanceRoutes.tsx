// src/modules/maintenance/routes/MaintenanceRoutes.tsx
import { Route, Routes } from "react-router-dom";
import ConfigSurveyPage from "../pages/survey/ConfigSurveyPage";
import SurveyPage from "../pages/survey/SurveyPage";

const MaintenanceRoutes = () => (
  <Routes>
    <Route path="/" element={<SurveyPage />} />
    <Route path="/config" element={<ConfigSurveyPage />} />
  </Routes>
);

export default MaintenanceRoutes;
