import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IPartType } from "../datas/partType/IPartType";
import { IPartTypeCreate } from "../datas/partType/IPartTypeCreate";
import { IPartTypeGet } from "../datas/partType/IPartTypeGet";
import { IPartTypeUpdate } from "../datas/partType/IPartTypeUpdate";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/PartTypes";

class PartTypeApi {
  // Hàm get danh sách devices
  get = async (
    params?: IPartTypeGet
  ): Promise<ApiResponseWithList<IPartType>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IPartTypeCreate
  ): Promise<ApiResponseWithList<IPartType>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IPartType>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IPartTypeCreate
  ): Promise<ApiResponseWithList<IPartType>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: IPartTypeUpdate
  ): Promise<ApiResponseWithList<IPartType>> => {
    return await axiosInstance.put(
      `${BASE_URL}/approve-reject-taskcheck/${id}`,
      params
    );
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<IPartType>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IPartType>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const partTypeApi = new PartTypeApi();

export default partTypeApi;
