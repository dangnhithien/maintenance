import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { CreateRowCheckListDto } from "../datas/rowCheckList/CreateRowCheckListDto";
import { GetRowCheckListDto } from "../datas/rowCheckList/GetRowCheckListDto";
import { RowCheckListDto } from "../datas/rowCheckList/RowCheckListDto";
import { TemplateCheckListDto } from "../datas/templateCheckList/TemplateCheckListDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/-row-check-list";

class RowCheckListApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetRowCheckListDto
  ): Promise<ApiResponseWithList<RowCheckListDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateRowCheckListDto
  ): Promise<ApiResponseWithList<RowCheckListDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string
  ): Promise<ApiResponseWithObject<RowCheckListDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateRowCheckListDto
  ): Promise<ApiResponseWithList<TemplateCheckListDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
}

const rowCheckListApi = new RowCheckListApi();

export default rowCheckListApi;
