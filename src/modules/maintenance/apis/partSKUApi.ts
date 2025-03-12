import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IPartSKU } from "../datas/partSKU/IPartSKU";
import { IPartSKUCreate } from "../datas/partSKU/IPartSKUCreate";
import { IPartSKUGet } from "../datas/partSKU/IPartSKUGet";
import { IPartSKUUpdate } from "../datas/partSKU/IPartSKUUpdate";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/PartSKUs";

class PartSKUApi {
  // Hàm get danh sách devices
  get = async (
    params?: IPartSKUGet
  ): Promise<ApiResponseWithList<IPartSKU>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IPartSKUCreate
  ): Promise<ApiResponseWithList<IPartSKU>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IPartSKU>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IPartSKUCreate
  ): Promise<ApiResponseWithList<IPartSKU>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: IPartSKUUpdate
  ): Promise<ApiResponseWithList<IPartSKU>> => {
    return await axiosInstance.put(
      `${BASE_URL}/approve-reject-taskcheck/${id}`,
      params
    );
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<IPartSKU>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IPartSKU>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const partSKUApi = new PartSKUApi();

export default partSKUApi;
