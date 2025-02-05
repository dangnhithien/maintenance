import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { CreateDeviceDto } from "../datas/device/CreateDeviceDto";
import { DeviceDto } from "../datas/device/DeviceDto";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/devices";

class DeviceApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetDeviceDto
  ): Promise<ApiResponseWithList<DeviceDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateDeviceDto
  ): Promise<ApiResponseWithList<DeviceDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<DeviceDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params: params });
  };
  update = async (
    id: string,
    params: CreateDeviceDto
  ): Promise<ApiResponseWithList<DeviceDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<DeviceDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<DeviceDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const deviceApi = new DeviceApi();

export default deviceApi;
