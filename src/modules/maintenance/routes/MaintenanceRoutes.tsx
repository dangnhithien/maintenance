import SpinnerLoading from "@components/SpinerLoading";
import React from "react";
import { Route, Routes } from "react-router-dom";
// Thay bằng đường dẫn đến component SpinnerLoading của bạn

const DeviceCreateUpdatePage = React.lazy(
  () => import("../pages/device/DeviceCreateUpdatePage")
);
const DeviceDetailPage = React.lazy(
  () => import("../pages/device/DeviceDetail")
);
const DeviceListPage = React.lazy(
  () => import("../pages/device/DeviceListPage")
);
const ErrorDetailCreateUpdatePage = React.lazy(
  () => import("../pages/errorDetail/ErrorDetailCreateUpdatePage")
);
const ErrorDetailListPage = React.lazy(
  () => import("../pages/errorDetail/ErrorDetailListPage")
);
const ErrorDetailPage = React.lazy(
  () => import("../pages/errorDetail/ErrorDetailPage")
);
const ProductCreateUpdatePage = React.lazy(
  () => import("../pages/product/ProductCreateUpdatePage")
);
const ProductDetailPage = React.lazy(
  () => import("../pages/product/ProductDetailPage")
);
const ProductListPage = React.lazy(
  () => import("../pages/product/ProductListPage")
);
const SolutionOptionCreateUpdatePage = React.lazy(
  () => import("../pages/solutionOption/SolutionOptionCreateUpdatePage")
);
const SolutionOptionDetailPage = React.lazy(
  () => import("../pages/solutionOption/SolutionOptionDetail")
);
const SolutionOptionListPage = React.lazy(
  () => import("../pages/solutionOption/SolutionOptionListPage")
);
const ConfigSurveyPage = React.lazy(
  () => import("../pages/survey/ConfigSurveyPage")
);
const SurveyPage = React.lazy(() => import("../pages/survey/SurveyPage"));
const TaskCheckDetailPage = React.lazy(
  () => import("../pages/taskCheck/TaskCheckDetailPage")
);
const TemplateCheckListCreateUpdatePage = React.lazy(
  () => import("../pages/templateCheckList/TemplateCheckListCreateUPdatePage")
);
const TypeDeviceCreateUpdatePage = React.lazy(
  () => import("../pages/typeDevice/TypeDeviceCreateUpdatePage")
);
const TypeDeviceDetailPage = React.lazy(
  () => import("../pages/typeDevice/TypeDeviceDetailPage")
);
const TypeDevicePage = React.lazy(
  () => import("../pages/typeDevice/TypeDeviceListPage")
);
const TypeErrorCreateUpdatePage = React.lazy(
  () => import("../pages/typeError/TypeErrorCreateUpdatePage")
);
const TypeErrorDetailPage = React.lazy(
  () => import("../pages/typeError/TypeErrorDetailPage")
);
const TypeErrorListPage = React.lazy(
  () => import("../pages/typeError/TypeErrorListPage")
);

const MaintenanceRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ProductListPage />
        </React.Suspense>
      }
    />
    {/* survey */}
    <Route
      path="/template-check-list/create/device/:deviceId"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TemplateCheckListCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/template-check-list/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TemplateCheckListCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/survey/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <SurveyPage />
        </React.Suspense>
      }
    />
    <Route
      path="/survey/config"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ConfigSurveyPage />
        </React.Suspense>
      }
    />

    {/* device */}
    <Route
      path="/device"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <DeviceListPage />
        </React.Suspense>
      }
    />
    <Route
      path="/device/create"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <DeviceCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/device/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <DeviceCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/device/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <DeviceDetailPage />
        </React.Suspense>
      }
    />

    {/* type device */}
    <Route
      path="/type-device"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeDevicePage />
        </React.Suspense>
      }
    />
    <Route
      path="/type-device/create"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeDeviceCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/type-device/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeDeviceCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/type-device/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeDeviceDetailPage />
        </React.Suspense>
      }
    />

    {/* product */}
    <Route
      path="/product"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ProductListPage />
        </React.Suspense>
      }
    />
    <Route
      path="/product/create"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ProductCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/product/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ProductCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/product/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ProductDetailPage />
        </React.Suspense>
      }
    />

    {/* errorDetail */}
    <Route
      path="/error-detail"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ErrorDetailListPage />
        </React.Suspense>
      }
    />
    <Route
      path="/error-detail/create"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ErrorDetailCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/error-detail/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ErrorDetailCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/error-detail/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <ErrorDetailPage />
        </React.Suspense>
      }
    />

    {/* typeError */}
    <Route
      path="/type-error"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeErrorListPage />
        </React.Suspense>
      }
    />
    <Route
      path="/type-error/create"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeErrorCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/type-error/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeErrorCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/type-error/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TypeErrorDetailPage />
        </React.Suspense>
      }
    />

    {/* solutionOption */}
    <Route
      path="/solution-option"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <SolutionOptionListPage />
        </React.Suspense>
      }
    />
    <Route
      path="/solution-option/create"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <SolutionOptionCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/solution-option/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <SolutionOptionCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/solution-option/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <SolutionOptionDetailPage />
        </React.Suspense>
      }
    />

    {/* taskCheck */}
    <Route
      path="/task-check/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <TaskCheckDetailPage />
        </React.Suspense>
      }
    />
  </Routes>
);

export default MaintenanceRoutes;
