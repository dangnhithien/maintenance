import { ApiResponse } from "../datas/comon/ApiResponse";
import { DeviceDto } from "../datas/device/DeviceDto";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";
import axiosInstance from "./axiosInstance";

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = "/api/devices";

class DeviceApi {
  // Hàm get danh sách devices
  get = async (params?: GetDeviceDto): Promise<ApiResponse<DeviceDto>> => {
    return await axiosInstance.get(BASE_URL, {
      params,
    });
  };
}

const deviceApi = new DeviceApi();

export default deviceApi;
