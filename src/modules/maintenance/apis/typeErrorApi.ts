import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import { CreateTypeErrorDto } from "../datas/typeError/CreateTypeErrorDto";
import { TypeErrorDto } from "../datas/typeError/TypeErrorDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/type-errors";

class TypeErrorApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetDeviceDto
  ): Promise<ApiResponseWithList<TypeErrorDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateTypeErrorDto
  ): Promise<ApiResponseWithList<TypeErrorDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string
  ): Promise<ApiResponseWithObject<TypeErrorDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateTypeErrorDto
  ): Promise<ApiResponseWithList<TypeErrorDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<TypeErrorDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<TypeErrorDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const typeErrorApi = new TypeErrorApi();

export default typeErrorApi;
