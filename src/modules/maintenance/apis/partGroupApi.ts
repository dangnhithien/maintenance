import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { IPartGroup } from "../datas/partGroup/IPartGroup";
import { IPartGroupCreate } from "../datas/partGroup/IPartGroupCreate";
import { IPartGroupGet } from "../datas/partGroup/IPartGroupGet";
import { IPartGroupUpdate } from "../datas/partGroup/IPartGroupUpdate";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/PartGroups";

class PartGroupApi {
  // Hàm get danh sách devices
  get = async (
    params?: IPartGroupGet
  ): Promise<ApiResponseWithList<IPartGroup>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: IPartGroupCreate
  ): Promise<ApiResponseWithList<IPartGroup>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<IPartGroup>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: IPartGroupCreate
  ): Promise<ApiResponseWithList<IPartGroup>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: IPartGroupUpdate
  ): Promise<ApiResponseWithList<IPartGroup>> => {
    return await axiosInstance.put(
      `${BASE_URL}/approve-reject-taskcheck/${id}`,
      params
    );
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<IPartGroup>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<IPartGroup>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const partGroupApi = new PartGroupApi();

export default partGroupApi;
