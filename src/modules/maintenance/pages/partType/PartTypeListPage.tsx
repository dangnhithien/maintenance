import Wrapper from "@modules/maintenance/components/common/Wrapper";
import PartTypeList from "@modules/maintenance/components/partType/PartTypeList";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
const page = {
  title: "Loại linh kiện",
  url: "/part-types",
  component: <PartTypeList />,
};
const PartTypeListPage = () => {
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
        <meta name="description" content="Danh sách loại linh kiện" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default PartTypeListPage;
