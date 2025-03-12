import Wrapper from "@modules/maintenance/components/common/Wrapper";
import PartTypeCreateUpdate from "@modules/maintenance/components/partType/PartTypeCreateUpdate";

import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
const page = {
  title: "Tạo mới loại linh kiện",
  url: "/part-types",
  component: <PartTypeCreateUpdate />,
};
const PartTypeCreateUpdatePage = () => {
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
        <meta name="description" content="Tạo mới loại thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>
        <PartTypeCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default PartTypeCreateUpdatePage;
