import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { CreateErrorDetailDto } from "../datas/errorDetail/CreateErrorDetailDto";
import { ErrorDetailDto } from "../datas/errorDetail/ErrorDetailDto";
import { GetErrorDetailDto } from "../datas/errorDetail/GetErrorDetailDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/error-details";

class ErrorDetailApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetErrorDetailDto
  ): Promise<ApiResponseWithList<ErrorDetailDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateErrorDetailDto
  ): Promise<ApiResponseWithList<ErrorDetailDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string
  ): Promise<ApiResponseWithObject<ErrorDetailDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateErrorDetailDto
  ): Promise<ApiResponseWithList<ErrorDetailDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<ErrorDetailDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<ErrorDetailDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const errorDetailApi = new ErrorDetailApi();

export default errorDetailApi;
