import { useCallback, useState } from "react";
import deviceApi from "../apis/deviceApi";
import { DeviceDto } from "../datas/device/DeviceDto";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";

interface Result {
  devices: DeviceDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchDevices: (params?: GetDeviceDto) => Promise<void>;
}

const useDevices = (initialParams?: GetDeviceDto): Result => {
  const [devices, setDevices] = useState<DeviceDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchDevices = useCallback(async (params?: GetDeviceDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deviceApi.get(params || initialParams);
      setDevices(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    devices,
    totalCount,
    loading,
    error,
    fetchDevices,
  };
};

export default useDevices;
