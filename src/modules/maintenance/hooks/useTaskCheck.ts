import { useCallback, useState } from "react";
import taskCheckApi from "../apis/taskCheckApi";
import { GetTaskCheckDto } from "../datas/taskCheck/GetTaskCheckDto";
import { TaskCheckDto } from "../datas/taskCheck/TaskCheckDto";

interface Result {
  taskChecks: TaskCheckDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchTaskChecks: (params?: GetTaskCheckDto) => Promise<void>;
}

const useTaskCheck = (initialParams?: GetTaskCheckDto): Result => {
  const [taskChecks, setTaskChecks] = useState<TaskCheckDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchTaskChecks = useCallback(async (params?: GetTaskCheckDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskCheckApi.get(params || initialParams);
      setTaskChecks(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch  type devices");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    taskChecks,
    totalCount,
    loading,
    error,
    fetchTaskChecks,
  };
};

export default useTaskCheck;
