import { useCallback, useState } from "react";
import errorDetailApi from "../apis/errorDetailApi";
import { ErrorDetailDto } from "../datas/errorDetail/ErrorDetailDto";
import { GetErrorDetailDto } from "../datas/errorDetail/GetErrorDetailDto";

interface Result {
  errorDetails: ErrorDetailDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchErrorDetails: (params?: GetErrorDetailDto) => Promise<void>;
}

const useErrorDetail = (initialParams?: GetErrorDetailDto): Result => {
  const [errorDetails, setErrorDetails] = useState<ErrorDetailDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchErrorDetails = useCallback(async (params?: GetErrorDetailDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await errorDetailApi.get(params || initialParams);
      setErrorDetails(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch  type devices");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    errorDetails,
    totalCount,
    loading,
    error,
    fetchErrorDetails,
  };
};

export default useErrorDetail;
