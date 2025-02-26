import { ApiRequest } from "@datas/comon/ApiRequest";
import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { CreateUserDto } from "../datas/user/CreateUserDto";
import { GetUserDto } from "../datas/user/GetUserDto";
import { OverviewUser } from "../datas/user/OverviewUser";
import { UpdateUserDto } from "../datas/user/UpdateUserDto";
import { UserDto } from "../datas/user/UserDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/admin";

class UserApi {
  // Hàm get danh sách devices
  get = async (params?: GetUserDto): Promise<ApiResponseWithList<UserDto>> => {
    return await axiosInstance.get(BASE_URL + "/get-user-list", {
      params,
    });
  };
  getOverviewUserTask = async (
    params?: GetUserDto
  ): Promise<ApiResponseWithList<OverviewUser>> => {
    return await axiosInstance.get(
      "api/users/get-overview-user-list-task-check",
      {
        params,
      }
    );
  };
  post = async (
    params?: CreateUserDto
  ): Promise<ApiResponseWithList<UserDto>> => {
    return await axiosInstance.post(BASE_URL + "/create-user", params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<UserDto>> => {
    return await axiosInstance.get(`${BASE_URL}/get-user-detail/${id}`, {
      params: params,
    });
  };
  update = async (
    id: string,
    params: UpdateUserDto
  ): Promise<ApiResponseWithObject<UserDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<UserDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<UserDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const userApi = new UserApi();

export default userApi;
