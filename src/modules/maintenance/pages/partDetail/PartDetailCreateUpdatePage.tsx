import Wrapper from "@modules/maintenance/components/common/Wrapper";
import PartDetailCreateUpdate from "@modules/maintenance/components/partDetail/PartDetailCreateUpdate";

import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
const page = {
  title: "Tạo mới  linh kiện",
  url: "/part-details",
  component: <PartDetailCreateUpdate />,
};
const PartDetailCreateUpdatePage = () => {
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
        <meta name="description" content="Tạo mới linh kiện" />
      </Helmet>

      <Wrapper title={page.title}>
        <PartDetailCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default PartDetailCreateUpdatePage;
