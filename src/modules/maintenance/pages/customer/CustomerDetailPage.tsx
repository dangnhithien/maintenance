import Wrapper from "@modules/maintenance/components/common/Wrapper";
import CustomerDetail from "@modules/maintenance/components/customer/CustomerDetail";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const CustomerDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Chi tiết</title>
        <meta name="description" content="Chi tiết" />
      </Helmet>
      <Wrapper title="Chi tiết khách hàng">
        <CustomerDetail id={id} />
      </Wrapper>
    </>
  );
};

export default CustomerDetailPage;
