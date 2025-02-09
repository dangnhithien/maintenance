import ProductListDetail from "@modules/maintenance/components/product/ProductListDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

const ProductListDetailPage = () => {
  const breadcrumbs = [
    <Link
      key="1"
      underline="none"
      component={RouterLink}
      to="/product-list-detail"
    >
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách thiết bị
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách thiết bị</title>
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
      <ProductListDetail />
    </div>
  );
};

export default ProductListDetailPage;
