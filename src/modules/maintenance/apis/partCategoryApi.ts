import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IPartCategory } from "../datas/partCategory/IPartCategory";
import { IPartCategoryCreate } from "../datas/partCategory/IPartCategoryCreate";
import { IPartCategoryGet } from "../datas/partCategory/IPartCategoryGet";
import { IPartCategoryUpdate } from "../datas/partCategory/IPartTypeUpdate";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/part-category";

class PartCategoryApi {
  // Hàm get danh sách devices
  get = async (
    params?: IPartCategoryGet
  ): Promise<ApiResponseWithList<IPartCategory>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IPartCategoryCreate
  ): Promise<ApiResponseWithList<IPartCategory>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IPartCategory>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IPartCategoryCreate
  ): Promise<ApiResponseWithList<IPartCategory>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: IPartCategoryUpdate
  ): Promise<ApiResponseWithList<IPartCategory>> => {
    return await axiosInstance.put(
      `${BASE_URL}/approve-reject-taskcheck/${id}`,
      params
    );
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<IPartCategory>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IPartCategory>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const partCategoryApi = new PartCategoryApi();

export default partCategoryApi;
