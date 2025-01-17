// src/modules/maintenance/routes/MaintenanceRoutes.tsx
import { Route, Routes } from "react-router-dom";
import SurveyPage from "../pages/survey/SurveyPage";

const MaintenanceRoutes = () => (
  <Routes>
    <Route path="/maintenance" element={<SurveyPage />} />
  </Routes>
);

export default MaintenanceRoutes;
