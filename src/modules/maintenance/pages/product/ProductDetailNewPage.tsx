import ProductDetailNew from "@modules/maintenance/components/product/ProductDetailNew";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
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

    <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
      Chi tiết
    </span>,
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
      <ProductDetailNew id={id} />
    </div>
  );
};

export default ProductDetailPage;
