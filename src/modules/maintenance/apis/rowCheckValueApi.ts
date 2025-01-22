import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { CreateRowCheckValueDto } from "../datas/rowCheckValue/CreateRowCheckValueDto";
import { GetRowCheckValueDto } from "../datas/rowCheckValue/GetRowCheckValueDto";
import { RowCheckValueDto } from "../datas/rowCheckValue/RowCheckValueDto";
import { TemplateCheckListDto } from "../datas/templateCheckList/TemplateCheckListDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/RowCheckValues";

class RowCheckValueApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetRowCheckValueDto
  ): Promise<ApiResponseWithList<RowCheckValueDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateRowCheckValueDto
  ): Promise<ApiResponseWithList<RowCheckValueDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string
  ): Promise<ApiResponseWithObject<RowCheckValueDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateRowCheckValueDto
  ): Promise<ApiResponseWithList<TemplateCheckListDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
}

const rowCheckValueApi = new RowCheckValueApi();

export default rowCheckValueApi;
