import Wrapper from "@modules/maintenance/components/common/Wrapper";
import PartSKUList from "@modules/maintenance/components/partSKU/PartSKUList";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
const page = {
  title: "SKU linh kiện",
  url: "/part-SKUs",
  component: <PartSKUList />,
};
const PartSKUListPage = () => {
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
        <meta name="description" content="Danh sách SKU linh kiện" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default PartSKUListPage;
