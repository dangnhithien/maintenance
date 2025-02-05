import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import { CreateSolutionOptionDto } from "../datas/solutionOption/CreateSolutionOptionDto";
import { SolutionOptionDto } from "../datas/solutionOption/SolutionOptionDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/solution-options";

class SolutionOptionApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetDeviceDto
  ): Promise<ApiResponseWithList<SolutionOptionDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateSolutionOptionDto
  ): Promise<ApiResponseWithList<SolutionOptionDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<SolutionOptionDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params: params });
  };
  update = async (
    id: string,
    params: CreateSolutionOptionDto
  ): Promise<ApiResponseWithList<SolutionOptionDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<SolutionOptionDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<SolutionOptionDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const solutionOptionApi = new SolutionOptionApi();

export default solutionOptionApi;
