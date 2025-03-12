import CaseList from "@modules/maintenance/components/case/CaseList";
import Wrapper from "@modules/maintenance/components/common/Wrapper";
import { Helmet } from "react-helmet";

const CaseListPage = () => {
  const breadcrumbs = [
    <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
      Danh sách khách hàng
    </span>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách khách hàng</title>
        <meta name="description" content="Danh sách các khách hàng" />
      </Helmet>

      <Wrapper title="Danh sách case">
        <CaseList />
      </Wrapper>
    </div>
  );
};

export default CaseListPage;
