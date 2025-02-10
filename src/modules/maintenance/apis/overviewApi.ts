import { ApiRequest } from "../datas/comon/ApiRequest";
import { ApiResponseWithList } from "../datas/comon/ApiResponse";
import { OverviewProductDto } from "../datas/overview/OverviewProductDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/dashboard";

class OverviewApi {
  // Hàm get danh sách devices
  get = async (
    params?: ApiRequest
  ): Promise<ApiResponseWithList<OverviewProductDto>> => {
    return await axiosInstance.get(
      `${BASE_URL}/products/overview-error-product`,
      {
        params,
      }
    );
  };
}

const overviewApi = new OverviewApi();

export default overviewApi;
