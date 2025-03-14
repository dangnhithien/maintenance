import Wrapper from "@modules/maintenance/components/common/Wrapper";
import PartDetailCreateUpdate from "@modules/maintenance/components/partDetail/PartDetailCreateUpdate";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
const page = {
  title: "Tạo mới  thành phần",
  url: "/part-details",
  component: <PartDetailCreateUpdate />,
};
const PartDetailCreateUpdatePage = () => {
  const { id, deviceId } = useParams();
  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.title} />
      </Helmet>
      <Wrapper title={page.title}>
        <PartDetailCreateUpdate id={id} deviceId={deviceId} />
      </Wrapper>
    </>
  );
};

export default PartDetailCreateUpdatePage;
