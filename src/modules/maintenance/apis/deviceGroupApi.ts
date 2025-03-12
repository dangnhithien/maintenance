import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IDeviceGroup } from "../datas/deviceGroup/IDeviceGroup";
import { IDeviceGroupCreate } from "../datas/deviceGroup/IDeviceGroupCreate";
import { IDeviceGroupGet } from "../datas/deviceGroup/IDeviceGroupGet";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/device-group";

class DeviceGroupApi {
  // Hàm get danh sách devices
  get = async (
    params?: IDeviceGroupGet
  ): Promise<ApiResponseWithList<IDeviceGroup>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IDeviceGroupCreate
  ): Promise<ApiResponseWithList<IDeviceGroup>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IDeviceGroup>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IDeviceGroupCreate
  ): Promise<ApiResponseWithList<IDeviceGroup>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<IDeviceGroup>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IDeviceGroup>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const deviceGroupApi = new DeviceGroupApi();

export default deviceGroupApi;
