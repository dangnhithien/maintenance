import Wrapper from "@modules/maintenance/components/common/Wrapper";
import DeviceModelCreateUpdate from "@modules/maintenance/components/deviceModel/DeviceModelCreateUpdate";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
const page = {
  title: "Tạo mới đời thiết bị",
  url: "/device-models",
  component: <DeviceModelCreateUpdate />,
};
const DeviceModelCreateUpdatePage = () => {
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
        <meta name="description" content="Tạo mới đời thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>
        <DeviceModelCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default DeviceModelCreateUpdatePage;
