import Wrapper from "@modules/maintenance/components/common/Wrapper";
import UserDetail from "@modules/user/components/user/UserDetail";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
const UserDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title>Danh sách nhân viên</title>
        <meta name="description" content="Danh sách nhân viên" />
      </Helmet>
      <Wrapper title="Chi tiết nhân viên">
        <UserDetail id={id} />
      </Wrapper>
    </>
  );
};

export default UserDetailPage;
