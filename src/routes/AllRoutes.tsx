// pages/AllRoutes.tsx
import MaintenanceRoutes from "@modules/maintenance/routes/MaintenanceRoutes";
import UserRoutes from "@modules/user/routes/UserRouter";

const AllRoutes = () => {
  return (
    <>
      <MaintenanceRoutes />
      <UserRoutes />
    </>
  );
};

export default AllRoutes;
