import TypeErrorCreateUpdate from "@modules/maintenance/components/typeError/TypeErrorCreateUpdate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const TypeErrorCreateUpdatePage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/type-error">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách loại lỗi
      </span>
    </Link>,
    <Link
      key="2"
      underline="none"
      component={RouterLink}
      to="/type-error/create"
    >
      <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
        Tạo mới
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách loại lỗi</title>
        <meta name="description" content="Tạo mới loại lỗi" />
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
      <TypeErrorCreateUpdate id={id} />
    </div>
  );
};

export default TypeErrorCreateUpdatePage;
