import Wrapper from "@modules/maintenance/components/common/Wrapper";
import TemplateCheckList from "@modules/maintenance/components/templateCheckList/TemplateCheckList";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
const page = {
  title: "Danh sách biểu mẫu",
  url: "/template-check-list",
  component: <TemplateCheckList />,
};
const TemplateCheckListPage = () => {
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
        <meta name="description" content="Danh sách biểu mẫu" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default TemplateCheckListPage;
