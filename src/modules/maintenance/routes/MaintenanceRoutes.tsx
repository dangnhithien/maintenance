// src/modules/maintenance/routes/MaintenanceRoutes.tsx
import { Route, Routes } from "react-router-dom";
import DeviceListPage from "../pages/device/DeviceListPage";
import ConfigSurveyPage from "../pages/survey/ConfigSurveyPage";
import SurveyPage from "../pages/survey/SurveyPage";
import SuverListPage from "../pages/survey/SuverListPage";

const MaintenanceRoutes = () => (
  <Routes>
    {/* survey */}
    <Route path="/survey" element={<SurveyPage />} />
    <Route path="/survey/create" element={<SurveyPage />} />
    <Route path="/survey/detail/:id" element={<SurveyPage />} />
    <Route path="/config" element={<ConfigSurveyPage />} />

    {/* device*/}
    <Route path="/device" element={<DeviceListPage />} />
    <Route path="/device/create" element={<ConfigSurveyPage />} />
    <Route path="/device/detail/:id" element={<SuverListPage />} />

    {/* type device*/}
    <Route path="/type-device" element={<DeviceListPage />} />
    <Route path="/type-device/create" element={<ConfigSurveyPage />} />
    <Route path="/type-device/detail/:id" element={<SuverListPage />} />
  </Routes>
);

export default MaintenanceRoutes;
