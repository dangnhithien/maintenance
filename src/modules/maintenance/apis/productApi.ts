import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { CreateProductDto } from "../datas/product/CreateProductDto";
import { GetProductDto } from "../datas/product/GetProductDto";
import { ProductDto } from "../datas/product/ProductDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/products";

class ProductApi {
  // Hàm get danh sách devices
  get = async (
    params?: GetProductDto
  ): Promise<ApiResponseWithList<ProductDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  getListProductDetail = async (
    params?: GetProductDto
  ): Promise<ApiResponseWithList<ProductDto>> => {
    return await axiosInstance.get(`${BASE_URL}/get-list-product-detail`, {
      params,
    });
  };
  post = async (
    params?: CreateProductDto
  ): Promise<ApiResponseWithList<ProductDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
  getById = async (
    id: string,
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<ProductDto>> => {
    return await axiosInstance.get(`${BASE_URL}/${id}`, { params: params });
  };

  update = async (
    id: string,
    params: CreateProductDto
  ): Promise<ApiResponseWithList<ProductDto>> => {
    return await axiosInstance.put(`${BASE_URL}/${id}`, params);
  };
  restore = async (ids: string[]): Promise<ApiResponseWithList<ProductDto>> => {
    return await axiosInstance.put(`${BASE_URL}/restore`, ids);
  };
  delete = async (
    isHardDeleted: boolean,
    ids: string[] // Mảng UUIDs
  ): Promise<ApiResponseWithList<ProductDto>> => {
    const params = { isHardDeleted };
    return await axiosInstance.delete(`${BASE_URL}`, {
      params: params,
      data: ids,
    });
  };
}

const productApi = new ProductApi();

export default productApi;
