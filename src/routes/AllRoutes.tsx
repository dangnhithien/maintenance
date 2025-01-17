// pages/AllRoutes.tsx
import LoginRoutes from "@modules/login/routes/LoginRoutes";
import MaintenanceRoutes from "@modules/maintenance/routes/MaintenanceRoutes";
import { BrowserRouter as Router } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Router>
      <MaintenanceRoutes />
      <LoginRoutes />
    </Router>
  );
};

export default AllRoutes;
