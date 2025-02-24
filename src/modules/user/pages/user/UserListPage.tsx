import Wrapper from "@modules/maintenance/components/common/Wrapper";
import UserList from "@modules/user/components/user/UserList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { Helmet } from "react-helmet";

const UserListPage = () => {
  const breadcrumbs = [
    // <Link key="1" underline="none" component={RouterLink} to="/user">
    <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
      Danh sách nhân viên
    </span>,
    // </Link>,
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
      <Wrapper>
        <UserList />
      </Wrapper>
    </div>
  );
};

export default UserListPage;
