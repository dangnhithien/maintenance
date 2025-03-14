import Wrapper from "@modules/maintenance/components/common/Wrapper";
import CustomerCreateUpdate from "@modules/maintenance/components/customer/CustomerCreateUpdate";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const CustomerCreateUpdatePage = () => {
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>Create Device</title>
        <meta name="description" content="Create a new device" />
      </Helmet>
      <Wrapper title="Tạo mới khách hàng">
        <CustomerCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default CustomerCreateUpdatePage;
