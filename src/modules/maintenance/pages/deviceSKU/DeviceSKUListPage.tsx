import Wrapper from "@modules/maintenance/components/common/Wrapper";
import DeviceSKUList from "@modules/maintenance/components/deviceSKU/DeviceSKUList";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
const page = {
  title: "Danh sách SKU thiết bị",
  url: "/device-SKUs",
  component: <DeviceSKUList />,
};
const DeviceSKUListPage = () => {
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
        <meta name="description" content="Danh sách SKU thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default DeviceSKUListPage;
