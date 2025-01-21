import { ApiResponse } from "../datas/comon/ApiResponse";
import { CreateProductDto } from "../datas/product/CreateProductDto";
import { GetProductDto } from "../datas/product/GetProductDto";
import { ProductDto } from "../datas/product/ProductDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/products";

class ProductApi {
  // Hàm get danh sách devices
  get = async (params?: GetProductDto): Promise<ApiResponse<ProductDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
  post = async (
    params?: CreateProductDto
  ): Promise<ApiResponse<ProductDto>> => {
    return await axiosInstance.post(BASE_URL, params);
  };
}

const productApi = new ProductApi();

export default productApi;
