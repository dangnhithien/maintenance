import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import { CreateTaskCheckDto } from "../datas/taskCheck/CreateTaskCheckDto";
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
}

const taskCheckApi = new TaskCheckApi();

export default taskCheckApi;
