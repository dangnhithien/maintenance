// src/modules/maintenance/routes/MaintenanceRoutes.tsx

import { Route, Routes } from "react-router-dom";
import Survey from "../components/survey/Survey";
import Home from "../pages";
import DeviceCreateUpdatePage from "../pages/device/DeviceCreateUpdatePage";
import DeviceListPage from "../pages/device/DeviceListPage";
import ErrorDetailCreateUpdatePage from "../pages/errorDetail/ErrorDetailCreateUpdatePage";
import ErrorDetailListPage from "../pages/errorDetail/ErrorDetailListPage";
import ProductCreateUpdatePage from "../pages/product/ProductCreateUpdatePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import ProductListPage from "../pages/product/ProductListPage";
import SolutionOptionCreateUpdatePage from "../pages/solutionOption/SolutionOptionCreateUpdatePage";
import SolutionOptionListPage from "../pages/solutionOption/SolutionOptionListPage";
import ConfigSurveyPage from "../pages/survey/ConfigSurveyPage";
import SurveyPage from "../pages/survey/SurveyPage";
import SuverListPage from "../pages/survey/SuverListPage";
import TemplateCheckListCreateUpdatePage from "../pages/templateCheckList/TemplateCheckListCreateUPdatePage";
import TypeDeviceCreateUpdatePage from "../pages/typeDevice/TypeDeviceCreateUpdatePage";
import { default as TypeDevicePage } from "../pages/typeDevice/TypeDeviceListPage";
import TypeErrorCreateUpdatePage from "../pages/typeError/TypeErrorCreateUpdatePage";
import TypeErrorListPage from "../pages/typeError/TypeErrorListPage";

const MaintenanceRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* survey */}
    <Route path="/survey" element={<Survey />} />
    <Route
      path="/template-check-list/create"
      element={<TemplateCheckListCreateUpdatePage />}
    />
    <Route path="/survey/detail/:id" element={<SurveyPage />} />
    <Route path="/survey/config" element={<ConfigSurveyPage />} />

    {/* device*/}
    <Route path="/device" element={<DeviceListPage />} />
    <Route path="/device/create" element={<DeviceCreateUpdatePage />} />
    <Route path="/device/create/:id" element={<DeviceCreateUpdatePage />} />
    <Route path="/device/detail/:id" element={<SuverListPage />} />

    {/* type device*/}
    <Route path="/type-device" element={<TypeDevicePage />} />
    <Route
      path="/type-device/create"
      element={<TypeDeviceCreateUpdatePage />}
    />
    <Route
      path="/type-device/create/:id"
      element={<TypeDeviceCreateUpdatePage />}
    />
    <Route
      path="/type-device/create/:id"
      element={<TypeDeviceCreateUpdatePage />}
    />
    <Route path="/type-device/detail/:id" element={<SuverListPage />} />

    {/* product*/}
    <Route path="/product" element={<ProductListPage />} />
    <Route path="/product/create" element={<ProductCreateUpdatePage />} />
    <Route path="/product/create/:id" element={<ProductCreateUpdatePage />} />
    <Route path="/product/detail/:id" element={<ProductDetailPage />} />

    {/* errorDetail*/}
    <Route path="/error-detail" element={<ErrorDetailListPage />} />
    <Route
      path="/error-detail/create"
      element={<ErrorDetailCreateUpdatePage />}
    />
    <Route
      path="/error-detail/create/:id"
      element={<ErrorDetailCreateUpdatePage />}
    />
    <Route path="/error-detail/detail/:id" element={<SuverListPage />} />

    {/* typeError*/}
    <Route path="/type-error" element={<TypeErrorListPage />} />
    <Route path="/type-error/create" element={<TypeErrorCreateUpdatePage />} />
    <Route
      path="/type-error/create/:id"
      element={<TypeErrorCreateUpdatePage />}
    />
    <Route
      path="/type-error/create/:id"
      element={<TypeErrorCreateUpdatePage />}
    />
    <Route path="/type-error/detail/:id" element={<SuverListPage />} />

    {/* solutionOption*/}
    <Route path="/solution-option" element={<SolutionOptionListPage />} />
    <Route
      path="/solution-option/create"
      element={<SolutionOptionCreateUpdatePage />}
    />
    <Route
      path="/solution-option/create/:id"
      element={<SolutionOptionCreateUpdatePage />}
    />
    <Route path="/solution-option/detail/:id" element={<SuverListPage />} />
  </Routes>
);

export default MaintenanceRoutes;
