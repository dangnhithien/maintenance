import UserDetail from "@modules/user/components/user/UserDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <span
      key="1"
      style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}
    >
      Chi tiết nhân viên
    </span>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách nhân viên</title>
        <meta name="description" content="Danh sách các thiết bị" />
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

      <UserDetail id={id} />
    </div>
  );
};

export default UserDetailPage;
