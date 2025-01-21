// src/modules/maintenance/routes/MaintenanceRoutes.tsx

import { Route, Routes } from "react-router-dom";
import Home from "../pages";
import DeviceCreateUpdatePage from "../pages/device/DeviceCreateUpdatePage";
import DeviceListPage from "../pages/device/DeviceListPage";
import ProductCreateUpdatePage from "../pages/product/ProductCreateUpdatePage";
import ProductListPage from "../pages/product/ProductListPage";
import ConfigSurveyPage from "../pages/survey/ConfigSurveyPage";
import SurveyCreateUpdatePage from "../pages/survey/SurveyCreateUpdatePage";
import SurveyPage from "../pages/survey/SurveyPage";
import SuverListPage from "../pages/survey/SuverListPage";
import TypeDeviceCreateUpdatePage from "../pages/typeDevice/TypeDeviceCreateUpdatePage";
import TypeDevicePage from "../pages/typeDevice/TypeDeviceListPage";

const MaintenanceRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* survey */}
    <Route path="/survey" element={<SuverListPage />} />
    <Route path="/survey/create" element={<SurveyCreateUpdatePage />} />
    <Route path="/survey/detail/:id" element={<SurveyPage />} />
    <Route path="/config" element={<ConfigSurveyPage />} />

    {/* device*/}
    <Route path="/device" element={<DeviceListPage />} />
    <Route path="/device/create" element={<DeviceCreateUpdatePage />} />
    <Route path="/device/detail/:id" element={<SuverListPage />} />

    {/* type device*/}
    <Route path="/type-device" element={<TypeDevicePage />} />
    <Route
      path="/type-device/create"
      element={<TypeDeviceCreateUpdatePage />}
    />
    <Route path="/type-device/detail/:id" element={<SuverListPage />} />

    {/* product*/}
    <Route path="/product" element={<ProductListPage />} />
    <Route path="/product/create" element={<ProductCreateUpdatePage />} />
    <Route path="/product/detail/:id" element={<SuverListPage />} />
  </Routes>
);

export default MaintenanceRoutes;
