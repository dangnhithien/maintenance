import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IDeviceSKU } from "../datas/deviceSKU/IDeviceSKU";
import { IDeviceSKUCreate } from "../datas/deviceSKU/IDeviceSKUCreate";
import { IDeviceSKUGet } from "../datas/deviceSKU/IDeviceSKUGet";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/device-sku";

class DeviceSKUApi {
  // Hàm get danh sách devices
  get = async (
    params?: IDeviceSKUGet
  ): Promise<ApiResponseWithList<IDeviceSKU>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IDeviceSKUCreate
  ): Promise<ApiResponseWithList<IDeviceSKU>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IDeviceSKU>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IDeviceSKUCreate
  ): Promise<ApiResponseWithList<IDeviceSKU>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<IDeviceSKU>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IDeviceSKU>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const deviceSKUApi = new DeviceSKUApi();

export default deviceSKUApi;
