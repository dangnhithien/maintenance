import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { OverviewKeyMetric } from "../datas/overview/OverviewKeyMetrics";
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
  getKeyMetric = async (
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<OverviewKeyMetric>> => {
    return await axiosInstance.get(`${BASE_URL}/key-metrics`, {
      params,
    });
  };
}

const overviewApi = new OverviewApi();

export default overviewApi;
