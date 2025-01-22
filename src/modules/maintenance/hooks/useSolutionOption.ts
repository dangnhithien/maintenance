import { useCallback, useState } from "react";
import solutionOptionApi from "../apis/solutionOptionApi";
import { GetSolutionOptionDto } from "../datas/solutionOption/GetSolutionOptionDto";
import { SolutionOptionDto } from "../datas/solutionOption/SolutionOptionDto";

interface Result {
  solutionOptions: SolutionOptionDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchSolutionOptions: (params?: GetSolutionOptionDto) => Promise<void>;
}

const useSolutionOptions = (initialParams?: GetSolutionOptionDto): Result => {
  const [solutionOptions, setSolutionOptions] = useState<SolutionOptionDto[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchDevices = useCallback(async (params?: GetSolutionOptionDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await solutionOptionApi.get(params || initialParams);
      setSolutionOptions(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    solutionOptions,
    totalCount,
    loading,
    error,
    fetchSolutionOptions: fetchDevices,
  };
};

export default useSolutionOptions;
