import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import taskCheckApi from "../apis/taskCheckApi";
import { CreateTaskCheckDto } from "../datas/taskCheck/CreateTaskCheckDto";
import { DeleteTaskCheckDto } from "../datas/taskCheck/DeleteTaskCheckDto";
import { GetTaskCheckDto } from "../datas/taskCheck/GetTaskCheckDto";

const KEY = "TaskChecks";
export const useTaskCheck = (initialParams?: GetTaskCheckDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () => taskCheckApi.get(initialParams).then((res) => res.result),
    staleTime: 60000,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (
        axiosError?.response?.status === 400 ||
        axiosError?.response?.status === 401
      ) {
        return false; // Không retry với lỗi Bad Request hoặc Unauthorized
      }
      return failureCount < 3; // Retry với các lỗi khác
    },
  });

  // Function to manually refetch with new params
  const fetchTaskChecks = (newParams: GetTaskCheckDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createTaskCheck = useMutation({
    mutationFn: (newData: CreateTaskCheckDto) => taskCheckApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateTaskCheck = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateTaskCheckDto;
    }) => taskCheckApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteTaskCheck = useMutation({
    mutationFn: (data: DeleteTaskCheckDto) =>
      taskCheckApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => taskCheckApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    taskChecks: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchTaskChecks, // Now accepts params
    createTaskCheck: createTaskCheck.mutateAsync,
    updateTaskCheck: updateTaskCheck.mutateAsync,
    deleteTaskCheck: deleteTaskCheck.mutateAsync,
    restoreTaskCheck: restoreChecklist.mutateAsync,
  };
};

export default useTaskCheck;
