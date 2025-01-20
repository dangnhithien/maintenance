import { useCallback, useState } from "react";
import typeDeviceApi from "../apis/typeDeviceApi";
import { GetTypeDeviceDto } from "../datas/typeDevice/GetTypeDeviceDto";
import { TypeDeviceDto } from "../datas/typeDevice/TypeDeviceDto";

interface UseDevicesResult {
  typeDevices: TypeDeviceDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchTypeDevices: (params?: GetTypeDeviceDto) => Promise<void>;
}

const useTypeDevices = (initialParams?: GetTypeDeviceDto): UseDevicesResult => {
  const [typeDevices, setTypeDevices] = useState<TypeDeviceDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchTypeDevices = useCallback(async (params?: GetTypeDeviceDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await typeDeviceApi.get(params || initialParams);
      setTypeDevices(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch  type devices");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    typeDevices: typeDevices,
    totalCount,
    loading,
    error,
    fetchTypeDevices,
  };
};

export default useTypeDevices;
