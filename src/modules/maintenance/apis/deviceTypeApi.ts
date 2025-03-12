import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IDeviceType } from "../datas/deviceType/IDeviceType";
import { IDeviceTypeCreate } from "../datas/deviceType/IDeviceTypeCreate";
import { IDeviceTypeGet } from "../datas/deviceType/IDeviceTypeGet";
import { IDeviceTypeUpdate } from "../datas/deviceType/IDeviceTypeUpdate";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/device-type";

class DeviceTypeApi {
  // Hàm get danh sách devices
  get = async (
    params?: IDeviceTypeGet
  ): Promise<ApiResponseWithList<IDeviceType>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IDeviceTypeCreate
  ): Promise<ApiResponseWithList<IDeviceType>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IDeviceType>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IDeviceTypeCreate
  ): Promise<ApiResponseWithList<IDeviceType>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: IDeviceTypeUpdate
  ): Promise<ApiResponseWithList<IDeviceType>> => {
    return await axiosInstance.put(
      `${BASE_URL}/approve-reject-taskcheck/${id}`,
      params
    );
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<IDeviceType>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IDeviceType>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const deviceTypeApi = new DeviceTypeApi();

export default deviceTypeApi;
