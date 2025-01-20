import { ApiResponse } from "../datas/comon/ApiResponse";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import { TypeDeviceDto } from "../datas/typeDevice/TypeDeviceDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/type-devices";

class TypeDeviceApi {
  // Hàm get danh sách devices
  get = async (params?: GetDeviceDto): Promise<ApiResponse<TypeDeviceDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
}

const typeDeviceApi = new TypeDeviceApi();

export default typeDeviceApi;
