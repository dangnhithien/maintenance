import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import { CreateTypeDeviceDto } from "../datas/typeDevice/CreateTypeDeviceDto";
import { TypeDeviceDto } from "../datas/typeDevice/TypeDeviceDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/type-devices";

class TypeDeviceApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetDeviceDto
  ): Promise<ApiResponseWithList<TypeDeviceDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateTypeDeviceDto
  ): Promise<ApiResponseWithList<TypeDeviceDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string
  ): Promise<ApiResponseWithObject<TypeDeviceDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateTypeDeviceDto
  ): Promise<ApiResponseWithList<TypeDeviceDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<TypeDeviceDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<TypeDeviceDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const typeDeviceApi = new TypeDeviceApi();

export default typeDeviceApi;
