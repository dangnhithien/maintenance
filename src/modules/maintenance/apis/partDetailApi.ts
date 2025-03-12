import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IPartDetail } from "../datas/partDetail/IPartDetail";
import { IPartDetailCreate } from "../datas/partDetail/IPartDetailCreate";
import { IPartDetailGet } from "../datas/partDetail/IPartDetailGet";
import { IPartDetailUpdate } from "../datas/partDetail/IPartDetailUpdate";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/PartDetails";

class PartDetailApi {
  // Hàm get danh sách devices
  get = async (
    params?: IPartDetailGet
  ): Promise<ApiResponseWithList<IPartDetail>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IPartDetailCreate
  ): Promise<ApiResponseWithList<IPartDetail>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IPartDetail>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IPartDetailCreate
  ): Promise<ApiResponseWithList<IPartDetail>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: IPartDetailUpdate
  ): Promise<ApiResponseWithList<IPartDetail>> => {
    return await axiosInstance.put(
      `${BASE_URL}/approve-reject-taskcheck/${id}`,
      params
    );
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<IPartDetail>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IPartDetail>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const partDetailApi = new PartDetailApi();

export default partDetailApi;
