import axiosInstance from "../../../apis/axiosInstance";
import { ApiRequest } from "../../../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { ICaseType } from "../datas/caseType/ICaseType";
import { ICaseTypeCreate } from "../datas/caseType/ICaseTypeCreate";
import { ICaseTypeGet } from "../datas/caseType/ICaseTypeGet";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/case-task-type";

class CaseTypeApi {
  // Hàm get danh sách CaseTypes
  get = async (
    params?: ICaseTypeGet
  ): Promise<ApiResponseWithList<ICaseType>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: ICaseTypeCreate
  ): Promise<ApiResponseWithList<ICaseType>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<ICaseType>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: ICaseTypeCreate
  ): Promise<ApiResponseWithList<ICaseType>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<ICaseType>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<ICaseType>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const caseTypeApi = new CaseTypeApi();

export default caseTypeApi;
