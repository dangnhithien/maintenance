import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { CreateCustomerDto } from "../datas/customer/CreateCustomerDto";
import { CustomerDto } from "../datas/customer/CustomerDto";
import { CustomerOverview } from "../datas/customer/CustomerOverview";
import { GetCustomerDto } from "../datas/customer/GetCustomerDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/customers";

class CustomerApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetCustomerDto
  ): Promise<ApiResponseWithList<CustomerDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  getOverviewCustomerTaskCheck = async (
    params?: GetCustomerDto
  ): Promise<ApiResponseWithObject<CustomerOverview>> => {
    return await axiosInstance.get(
      BASE_URL + "/get-overview-customer-task-check",
      {
        params,
      }
    );
  };
  post = async (
    params?: CreateCustomerDto
  ): Promise<ApiResponseWithList<CustomerDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (id: string): Promise<ApiResponseWithObject<CustomerDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`);
  };
  update = async (
    id: string,
    params: CreateCustomerDto
  ): Promise<ApiResponseWithList<CustomerDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (
    ids: string[]
  ): Promise<ApiResponseWithList<CustomerDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<CustomerDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const customerApi = new CustomerApi();

export default customerApi;
