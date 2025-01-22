import Wrapper from "@modules/maintenance/components/common/Wrapper";
import DeviceDetail from "@modules/maintenance/components/device/DeviceDetail";
import TemplateCheckList from "@modules/maintenance/components/templateCheckList/TemplateCheckList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const DeviceDetailPage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/product">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách nhóm thiết bị
      </span>
    </Link>,
    <Link
      key="2"
      underline="none"
      component={RouterLink}
      to="/product/detail/:id"
    >
      <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
        chi tiết
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Chi tiết</title>
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
      <DeviceDetail id={id} />
      <Wrapper title="Danh sách phiếu khảo sát">
        <TemplateCheckList deviceId={id} />
      </Wrapper>
    </div>
  );
};

export default DeviceDetailPage;
