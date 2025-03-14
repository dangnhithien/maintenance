import Wrapper from "@modules/maintenance/components/common/Wrapper";
import CustomerList from "@modules/maintenance/components/customer/CustomerList";
import { Helmet } from "react-helmet";
const CustomerListPage = () => {
  return (
    <>
      <Helmet>
        <title>Danh sách khách hàng</title>
        <meta name="description" content="Danh sách các khách hàng" />
      </Helmet>
      <Wrapper title="Danh sách khách hàng">
        <CustomerList />
      </Wrapper>
    </>
  );
};

export default CustomerListPage;
