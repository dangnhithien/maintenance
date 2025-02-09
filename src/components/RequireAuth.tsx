import { Navigate } from "react-router-dom";

interface Props {
  children?: any;
  redirectTo?: any;
}

const RequireAuth = (props: Props) => {
  const { children, redirectTo } = props;
  let isAuthenticated = true;
  const userTokenString = localStorage.getItem("token") as string;
  if (!userTokenString) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  // const userToken = JSON.parse(userTokenString);
  // if (userToken) {
  //   //Kiểm tra Token hợp lệ
  //   if (userToken.dateExpired < new Date().getTime() / 1000) {
  //     isAuthenticated = false;
  //   }
  // } else {
  //   isAuthenticated = false;
  // }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
