import Wrapper from "@modules/maintenance/components/common/Wrapper";
import DeviceList from "@modules/maintenance/components/device/DeviceList";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
const page = {
  title: "Danh sách thiết bị",
  url: "/devices",
  component: <DeviceList />,
};
const DeviceListPage = () => {
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to={page.url}>
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        {page.title}
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content="Danh sách thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default DeviceListPage;
