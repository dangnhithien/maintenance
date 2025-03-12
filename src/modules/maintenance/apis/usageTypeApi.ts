import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IUsageType } from "../datas/usageType/IUsageType";
import { IUsageTypeCreate } from "../datas/usageType/IUsageTypeCreate";
import { IUsageTypeGet } from "../datas/usageType/IUsageTypeGet";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/usage-type";

class UsageTypeApi {
  // Hàm get danh sách UsageTypes
  get = async (
    params?: IUsageTypeGet
  ): Promise<ApiResponseWithList<IUsageType>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IUsageTypeCreate
  ): Promise<ApiResponseWithList<IUsageType>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IUsageType>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IUsageTypeCreate
  ): Promise<ApiResponseWithList<IUsageType>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<IUsageType>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IUsageType>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const usageTypeApi = new UsageTypeApi();

export default usageTypeApi;
