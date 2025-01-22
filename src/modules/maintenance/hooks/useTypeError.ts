import { useCallback, useState } from "react";
import typeErrorApi from "../apis/typeErrorApi";
import { GetTypeErrorDto } from "../datas/typeError/GetTypeErrorDto";
import { TypeErrorDto } from "../datas/typeError/TypeErrorDto";

interface Result {
  typeErrors: TypeErrorDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchTypeErrors: (params?: GetTypeErrorDto) => Promise<void>;
}

const useTypeError = (initialParams?: GetTypeErrorDto): Result => {
  const [typeErrors, setTypeErrors] = useState<TypeErrorDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchTypeErrors = useCallback(async (params?: GetTypeErrorDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await typeErrorApi.get(params || initialParams);
      setTypeErrors(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch  type devices");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    typeErrors,
    totalCount,
    loading,
    error,
    fetchTypeErrors,
  };
};

export default useTypeError;
