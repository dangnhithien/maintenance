import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import { CreateTemplateCheckListDto } from "../datas/templateCheckList/CreateTemplateCheckListDto";
import { TemplateCheckListDto } from "../datas/templateCheckList/TemplateCheckListDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/template-check";

class TemplateCheckListApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetDeviceDto
  ): Promise<ApiResponseWithList<TemplateCheckListDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateTemplateCheckListDto
  ): Promise<ApiResponseWithObject<TemplateCheckListDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<TemplateCheckListDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params: params });
  };
  update = async (
    id: string,
    params: CreateTemplateCheckListDto
  ): Promise<ApiResponseWithList<TemplateCheckListDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<TemplateCheckListDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<TemplateCheckListDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const templateCheckListApi = new TemplateCheckListApi();

export default templateCheckListApi;
