import axiosInstance from "../../../apis/axiosInstance";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../../../datas/comon/ApiResponse";
import { ComponentDto } from "../datas/component/ComponentDto";
import { CreateComponentDto } from "../datas/component/CreateComponentDto";
import { GetComponentDto } from "../datas/component/GetComponentDto";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/components";

class ComponentApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetComponentDto
  ): Promise<ApiResponseWithList<ComponentDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };

  post = async (
    params?: CreateComponentDto
  ): Promise<ApiResponseWithObject<ComponentDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  //   getById = async (
  //     id: string,
  //     params?: ApiRequest
  //   ): Promise<ApiResponseWithObject<ProductDto>> => {
  //     return await axiosInstance.get(`${BASE_URL}/${id}`, { params: params });
  //   };

  //   update = async (
  //     id: string,
  //     params: CreateProductDto
  //   ): Promise<ApiResponseWithList<ProductDto>> => {
  //     return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  //   };
  //   restore = async (ids: string[]): Promise<ApiResponseWithList<ProductDto>> => {
  //     return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  //   };
  //   delete = async (
  //     isHardDeleted: boolean,
  //     ids: string[] // Mảng UUIDs
  //   ): Promise<ApiResponseWithList<ProductDto>> => {
  //     const params = { isHardDeleted };
  //     return await axiosInstance.delete(`${BASE_URL}`, {
  //       params: params,
  //       data: ids,
  //     });
  //   };
}

const componentApi = new ComponentApi();

export default componentApi;
