// src/modules/maintenance/routes/MaintenanceRo
import SpinnerLoading from "@components/SpinerLoading";
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserCreateUpdatePage from "../pages/user/UserCreateUpdatePage";
import UserDetailPage from "../pages/user/UserDetailPage";

const UserListPage = React.lazy(() => import("../pages/user/UserListPage"));
const UserRoutes = () => (
  <Routes>
    <Route
      path="/user"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <UserListPage />
        </React.Suspense>
      }
    />
    <Route
      path="/user/create/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <UserCreateUpdatePage />
        </React.Suspense>
      }
    />
    <Route
      path="/user/create/"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <UserCreateUpdatePage />
        </React.Suspense>
      }
    />

    <Route
      path="/user/detail/:id"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <UserDetailPage />
        </React.Suspense>
      }
    />
  </Routes>
);

export default UserRoutes;
