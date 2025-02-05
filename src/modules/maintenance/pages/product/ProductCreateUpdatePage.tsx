import ProductCreateUpdate from "@modules/maintenance/components/product/ProductCreateUpdate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const ProductCreateUpdatePage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/product">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách thiết bị
      </span>
    </Link>,

    <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
      Tạo mới
    </span>,
  ];

  return (
    <div>
      <Helmet>
        <title>Create Device</title>
        <meta name="description" content="Create a new device" />
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
      <ProductCreateUpdate id={id} />
    </div>
  );
};

export default ProductCreateUpdatePage;
