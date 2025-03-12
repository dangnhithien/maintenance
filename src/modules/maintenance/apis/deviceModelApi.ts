import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IDeviceModel } from "../datas/deviceModel/IDeviceModel";
import { IDeviceModelCreate } from "../datas/deviceModel/IDeviceModelCreate";
import { IDeviceModelGet } from "../datas/deviceModel/IDeviceModelGet";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/device-model";

class DeviceModelApi {
  // Hàm get danh sách devices
  get = async (
    params?: IDeviceModelGet
  ): Promise<ApiResponseWithList<IDeviceModel>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IDeviceModelCreate
  ): Promise<ApiResponseWithList<IDeviceModel>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IDeviceModel>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IDeviceModelCreate
  ): Promise<ApiResponseWithList<IDeviceModel>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<IDeviceModel>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IDeviceModel>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const deviceModelApi = new DeviceModelApi();

export default deviceModelApi;
