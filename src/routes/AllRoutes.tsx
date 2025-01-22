// pages/AllRoutes.tsx
import LoginRoutes from "@modules/login/routes/LoginRoutes";
import MaintenanceRoutes from "@modules/maintenance/routes/MaintenanceRoutes";

const AllRoutes = () => {
  return (
    <>
      <MaintenanceRoutes />
      <LoginRoutes />
    </>
  );
};

export default AllRoutes;
