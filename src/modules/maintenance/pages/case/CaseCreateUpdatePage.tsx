import CaseCreateUpdate from "@modules/maintenance/components/case/CaseCreateUpdate";
import Wrapper from "@modules/maintenance/components/common/Wrapper";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const CaseCreateUpdatePage = () => {
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>Create Device</title>
        <meta name="description" content="Create a new device" />
      </Helmet>
      <Wrapper title="Tạo Case">
        <CaseCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default CaseCreateUpdatePage;
