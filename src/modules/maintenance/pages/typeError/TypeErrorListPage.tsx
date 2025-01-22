import TypeErrorList from "@modules/maintenance/components/typeError/TypeErrorList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

const TypeErrorListPage = () => {
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/type-error">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách loại Lỗi
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách loại lỗi</title>
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
      <TypeErrorList />
    </div>
  );
};

export default TypeErrorListPage;
