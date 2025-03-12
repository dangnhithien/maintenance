import Wrapper from "@modules/maintenance/components/common/Wrapper";
import TaskCheckList from "@modules/maintenance/components/taskCheck/TaskCheckList";
import { Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
const page = {
  title: "Quản lí task",
  url: "/template-check-list",
  component: <TaskCheckList />,
};
const TaskCheckListPage = () => {
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
        <meta name="description" content="Danh sách các thiết bị" />
      </Helmet>

      <Wrapper title={page.title}>{page.component}</Wrapper>
    </div>
  );
};

export default TaskCheckListPage;
