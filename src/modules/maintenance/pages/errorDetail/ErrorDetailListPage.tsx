import ErrorDetailList from "@modules/maintenance/components/errorDetail/ErrorDetailList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

const TypeErrorListPage = () => {
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/error-detail">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách lỗi
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách lỗi</title>
        <meta name="description" content="Danh sách các lỗi" />
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
      <ErrorDetailList />
    </div>
  );
};

export default TypeErrorListPage;
