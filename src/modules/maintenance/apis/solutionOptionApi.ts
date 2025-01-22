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
    id: string
  ): Promise<ApiResponseWithObject<SolutionOptionDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateSolutionOptionDto
  ): Promise<ApiResponseWithList<SolutionOptionDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
}

const solutionOptionApi = new SolutionOptionApi();

export default solutionOptionApi;
