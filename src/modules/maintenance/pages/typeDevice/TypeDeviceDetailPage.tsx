import TypeDeviceDetail from "@modules/maintenance/components/typeDevice/TypeDeviceDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const TypeDeviceDetailPage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/type-device">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách loại thiết bị
      </span>
    </Link>,
    <Link key="2" underline="none" component={RouterLink} to="#">
      <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
        Chi tiết
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>chi tiết</title>
        <meta name="description" content="Chi tiết" />
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
      <TypeDeviceDetail id={id} />
    </div>
  );
};

export default TypeDeviceDetailPage;
