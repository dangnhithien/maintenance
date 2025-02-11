import { ApiRequest } from "../datas/comon/ApiRequest";
import {
  ApiResponseWithList,
  ApiResponseWithObject,
} from "../datas/comon/ApiResponse";
import { OverviewKeyMetricDto } from "../datas/overview/OverviewKeyMetricsDto";
import { OverviewProductDto } from "../datas/overview/OverviewProductDto";
import { OverviewStatusCheckProductDto } from "../datas/overview/OverviewStatusCheckProductDto";
import { OverviewStatusTaskCheckDto } from "../datas/overview/OverviewStatusTaskCheckDto";
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
  ): Promise<ApiResponseWithObject<OverviewKeyMetricDto>> => {
    return await axiosInstance.get(`${BASE_URL}/key-metrics`, {
      params,
    });
  };
  getStatusProduct = async (
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<OverviewStatusCheckProductDto>> => {
    return await axiosInstance.get(
      `${BASE_URL}/products/get-overview-status-check-product`,
      {
        params,
      }
    );
  };
  getStatusTaskCheck = async (
    params?: ApiRequest
  ): Promise<ApiResponseWithObject<OverviewStatusTaskCheckDto>> => {
    return await axiosInstance.get(
      `${BASE_URL}/taskchecks/get-overview-status-task-check`,
      {
        params,
      }
    );
  };
}

const overviewApi = new OverviewApi();

export default overviewApi;
