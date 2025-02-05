import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import typeErrorApi from "../apis/typeErrorApi";
import { CreateTypeErrorDto } from "../datas/typeError/CreateTypeErrorDto";
import { DeleteTypeErrorDto } from "../datas/typeError/DeleteTypeErrorDto";
import { GetTypeErrorDto } from "../datas/typeError/GetTypeErrorDto";

const KEY = "typeErrors";
export const useTypeError = (initialParams?: GetTypeErrorDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () => typeErrorApi.get(initialParams).then((res) => res.result),
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
  const fetchTypeErrors = (newParams: GetTypeErrorDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createTypeError = useMutation({
    mutationFn: (newData: CreateTypeErrorDto) => typeErrorApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateTypeError = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateTypeErrorDto;
    }) => typeErrorApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteTypeError = useMutation({
    mutationFn: (data: DeleteTypeErrorDto) =>
      typeErrorApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => typeErrorApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    typeErrors: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchTypeErrors, // Now accepts params
    createTypeError: createTypeError.mutateAsync,
    updateTypeError: updateTypeError.mutateAsync,
    deleteTypeError: deleteTypeError.mutateAsync,
    restoreTypeError: restoreChecklist.mutateAsync,
  };
};

export default useTypeError;
