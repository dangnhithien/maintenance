import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import errorDetailApi from "../apis/errorDetailApi";
import { CreateErrorDetailDto } from "../datas/errorDetail/CreateErrorDetailDto";
import { DeleteErrorDetailDto } from "../datas/errorDetail/DeleteErrorDetailDto";
import { GetErrorDetailDto } from "../datas/errorDetail/GetErrorDetailDto";

const KEY = "ErrorDetails";
export const useErrorDetail = (initialParams?: GetErrorDetailDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () => errorDetailApi.get(initialParams).then((res) => res.result),
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
  const fetchErrorDetails = (newParams: GetErrorDetailDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createErrorDetail = useMutation({
    mutationFn: (newData: CreateErrorDetailDto) => errorDetailApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateErrorDetail = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateErrorDetailDto;
    }) => errorDetailApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteErrorDetail = useMutation({
    mutationFn: (data: DeleteErrorDetailDto) =>
      errorDetailApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => errorDetailApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    errorDetails: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchErrorDetails, // Now accepts params
    createErrorDetail: createErrorDetail.mutateAsync,
    updateErrorDetail: updateErrorDetail.mutateAsync,
    deleteErrorDetail: deleteErrorDetail.mutateAsync,
    restoreErrorDetail: restoreChecklist.mutateAsync,
  };
};

export default useErrorDetail;
