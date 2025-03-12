import Wrapper from "@modules/maintenance/components/common/Wrapper";
import DeviceSKUCreateUpdate from "@modules/maintenance/components/deviceSKU/DeviceSKUCreateUpdate";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
const page = {
  title: "Tạo mới SKU thiết bị",
  url: "/device-SKUs",
  component: <DeviceSKUCreateUpdate />,
};
const DeviceSKUCreateUpdatePage = () => {
  const { id } = useParams();
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
        <meta name="description" content="Tạo mới SKU thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>
        <DeviceSKUCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default DeviceSKUCreateUpdatePage;
