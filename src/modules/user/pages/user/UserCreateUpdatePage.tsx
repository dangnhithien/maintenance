import Wrapper from "@modules/maintenance/components/common/Wrapper";
import UserCreateUpdate from "@modules/user/components/user/UserCreateUpdate";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const UserCreateUpdatePage = () => {
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>Create user</title>
        <meta name="description" content="Create a new user" />
      </Helmet>

      <Wrapper title="Tạo mới nhân viên">
        <UserCreateUpdate id={id} />
      </Wrapper>
    </div>
  );
};

export default UserCreateUpdatePage;
