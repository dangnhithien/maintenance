import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { CreateRowCheckListDto } from "../datas/rowCheckList/CreateRowCheckListDto";
import { GetRowCheckListDto } from "../datas/rowCheckList/GetRowCheckListDto";
import { RowCheckListDto } from "../datas/rowCheckList/RowCheckListDto";
import { UpdateRowCheckListDto } from "../datas/rowCheckList/UpdateRowCheckListDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/row-check";

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
  ): Promise<ApiResponseWithObject<RowCheckListDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string
  ): Promise<ApiResponseWithObject<RowCheckListDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: UpdateRowCheckListDto
  ): Promise<ApiResponseWithObject<RowCheckListDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<RowCheckListDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<RowCheckListDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const rowCheckListApi = new RowCheckListApi();

export default rowCheckListApi;
