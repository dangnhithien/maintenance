import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import {
  CreateTaskCheckDto,
  UpdateTaskCheckDto,
} from "../datas/taskCheck/CreateTaskCheckDto";
import { TaskCheckDto } from "../datas/taskCheck/TaskCheckDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/task-check";

class TaskCheckApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetDeviceDto
  ): Promise<ApiResponseWithList<TaskCheckDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateTaskCheckDto
  ): Promise<ApiResponseWithList<TaskCheckDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<TaskCheckDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params });
  };
  update = async (
    id: string,
    params: CreateTaskCheckDto
  ): Promise<ApiResponseWithList<TaskCheckDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  approveStatus = async (
    id: string,
    params: UpdateTaskCheckDto
  ): Promise<ApiResponseWithList<TaskCheckDto>> => {
    return await axiosInstance.put(`${BASE_URL}/approve-status/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<TaskCheckDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<TaskCheckDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const taskCheckApi = new TaskCheckApi();

export default taskCheckApi;
