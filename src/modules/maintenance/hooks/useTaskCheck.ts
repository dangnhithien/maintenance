import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import taskCheckApi from "../apis/taskCheckApi";
import { CreateTaskCheckDto } from "../datas/taskCheck/CreateTaskCheckDto";
import { DeleteTaskCheckDto } from "../datas/taskCheck/DeleteTaskCheckDto";
import { GetTaskCheckDto } from "../datas/taskCheck/GetTaskCheckDto";
import { TaskCheckDto } from "../datas/taskCheck/TaskCheckDto";

const KEY = "TaskChecks";
export const useTaskCheck = () => {
  const queryClient = useQueryClient();
  const [taskChecks, setTaskChecks] = useState<TaskCheckDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchTaskChecks = async (params: GetTaskCheckDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskCheckApi.get(params);
      setTaskChecks(response?.result?.items || []);
      setTotalCount(response.result.totalCount);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (
        axiosError?.response?.status === 400 ||
        axiosError?.response?.status === 401
      ) {
        setError("Unauthorized or bad request");
      } else {
        setError(axiosError.message);
      }
    } finally {
      setLoading(false);
    }
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

  const restoreTaskCheck = useMutation({
    mutationFn: (ids: string[]) => taskCheckApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchTaskChecks, // Function to manually fetch data
    createTaskCheck: createTaskCheck.mutateAsync,
    updateTaskCheck: updateTaskCheck.mutateAsync,
    deleteTaskCheck: deleteTaskCheck.mutateAsync,
    restoreTaskCheck: restoreTaskCheck.mutateAsync,
    taskChecks,
    totalCount,
    loading,
    error,
  };
};

export default useTaskCheck;
