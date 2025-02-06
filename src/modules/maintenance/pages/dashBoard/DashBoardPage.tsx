import Dashboard from "@modules/maintenance/components/dashboard/Dashboard";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
  return (
    <div>
      <Helmet>
        <title>Danh sách thiết bị</title>
        <meta name="description" content="Danh sách các thiết bị" />
      </Helmet>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
