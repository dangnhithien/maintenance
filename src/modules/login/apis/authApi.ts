import axiosInstance from "@modules/maintenance/apis/axiosInstance";
import { ApiRequest } from "@modules/maintenance/datas/comon/ApiRequest";
import { ApiResponseWithObject } from "@modules/maintenance/datas/comon/ApiResponse";
import axios from "axios";
import { LoginDto } from "../datas/LoginDto";
import { UserDto } from "../datas/UserDto";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

class AuthApi {
  login = async (data: LoginDto) => {
    try {
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
    } catch (error) {
      return error;
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
