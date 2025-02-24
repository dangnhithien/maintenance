import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { CreateRoleDTo } from "../datas/role/CreateRoleDto";
import { GetRoleDto } from "../datas/role/GetRoleDto";
import { RoleDto } from "../datas/role/RoleDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/Roles";

class RoleApi {
  // Hàm get danh sách devices
  get = async (params?: GetRoleDto): Promise<ApiResponseWithList<RoleDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateRoleDTo
  ): Promise<ApiResponseWithList<RoleDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (id: string): Promise<ApiResponseWithObject<RoleDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
}

const roleApi = new RoleApi();

export default roleApi;
