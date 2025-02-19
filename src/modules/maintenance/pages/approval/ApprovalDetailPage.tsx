import ApprovalDetail from "@modules/maintenance/components/approval/ApprovalDetail";
import Wrapper from "@modules/maintenance/components/common/Wrapper";
import TaskCheckDetail from "@modules/maintenance/components/taskCheck/TaskCheckDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const ApprovalDetailPage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/approval">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách cần duyệt
      </span>
    </Link>,
    <Link key="2" underline="none" component={RouterLink} to="#">
      <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
        Chi tiết
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Chi tiết</title>
        <meta name="description" content="Chi tiết" />
      </Helmet>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          margin: "10px 0",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      <TaskCheckDetail id={id} />
      <Wrapper sx={{ mt: 1 }}>
        <ApprovalDetail id={id} />
      </Wrapper>
    </div>
  );
};

export default ApprovalDetailPage;
