import Wrapper from "@modules/maintenance/components/common/Wrapper";
import AdminAssignee from "@modules/maintenance/components/taskCheck/AdminAssignee";
import { Helmet } from "react-helmet";
const page = {
  title: "Danh sách thiết bị cần bảo trì",
  url: "/assignee",
  component: <AdminAssignee />,
};
const AdminAssigneePage = () => {
  return (
    <div>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content="Danh sách các thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default AdminAssigneePage;
