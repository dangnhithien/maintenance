import CaseDetail from "@modules/maintenance/components/case/CaseDetail";
import Wrapper from "@modules/maintenance/components/common/Wrapper";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const CaseDetailPage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/Case">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách khách hàng
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

      <Wrapper title="Chi tiết case">
        <CaseDetail />
      </Wrapper>
    </div>
  );
};

export default CaseDetailPage;
