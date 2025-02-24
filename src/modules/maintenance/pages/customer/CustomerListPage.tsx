import Wrapper from "@modules/maintenance/components/common/Wrapper";
import CustomerList from "@modules/maintenance/components/customer/CustomerList";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

const CustomerListPage = () => {
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to="/error-detail">
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách khách hàng
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách khách hàng</title>
        <meta name="description" content="Danh sách các khách hàng" />
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
        <CustomerList />
      </Wrapper>
    </div>
  );
};

export default CustomerListPage;
