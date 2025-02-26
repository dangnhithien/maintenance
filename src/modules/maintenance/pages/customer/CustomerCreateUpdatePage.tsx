import CustomerCreateUpdate from "@modules/maintenance/components/customer/CustomerCreateUpdate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const CustomerCreateUpdatePage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/customer">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách khách hàng
      </span>
    </Link>,
    <Link key="2" underline="none" component={RouterLink} to="/customer/create">
      <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
        Tạo mới
      </span>
    </Link>,
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
      <CustomerCreateUpdate id={id} />
    </div>
  );
};

export default CustomerCreateUpdatePage;
