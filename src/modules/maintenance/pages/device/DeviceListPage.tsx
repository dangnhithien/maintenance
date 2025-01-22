import DeviceList from "@modules/maintenance/components/device/DeviceList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

const DeviceListPage = () => {
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/device">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách nhóm thiết bị
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách thiết bị</title>
        <meta name="description" content="Danh sách các thiết bị" />
      </Helmet>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          margin: "10px 0",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <DeviceList />
    </div>
  );
};

export default DeviceListPage;
