import { ApiResponseWithObject } from "@datas/comon/ApiResponse";
import axios from "axios";
import { ApiRequest } from "src/datas/comon/ApiRequest";

import axiosInstance from "../../../apis/axiosInstance";
import { UserDto } from "../../user/datas/user/UserDto";
import { LoginDto } from "../datas/LoginDto";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

class AuthApi {
  login = async (data: LoginDto) => {
    const response = await axios.post(
      `${baseUrl}/api/Auth/login`,
      {
        username: data.userName,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  };
  getUserInfo = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<UserDto>> => {
    return await axiosInstance.get(`user`, { params: params });
  };
  register = async () => {};
  updateUserInfo = async () => {};
}
const authApi = new AuthApi();
export { authApi };
