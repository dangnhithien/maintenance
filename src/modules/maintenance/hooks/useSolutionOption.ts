import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import solutionOptionApi from "../apis/solutionOptionApi";
import { CreateSolutionOptionDto } from "../datas/solutionOption/CreateSolutionOptionDto";
import { DeleteSolutionOptionDto } from "../datas/solutionOption/DeleteSolutionOptionDto";
import { GetSolutionOptionDto } from "../datas/solutionOption/GetSolutionOptionDto";

const KEY = "SolutionOptions";
export const useSolutionOption = (initialParams?: GetSolutionOptionDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () =>
      solutionOptionApi.get(initialParams).then((res) => res.result),
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
  const fetchSolutionOptions = (newParams: GetSolutionOptionDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createSolutionOption = useMutation({
    mutationFn: (newData: CreateSolutionOptionDto) =>
      solutionOptionApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateSolutionOption = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateSolutionOptionDto;
    }) => solutionOptionApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteSolutionOption = useMutation({
    mutationFn: (data: DeleteSolutionOptionDto) =>
      solutionOptionApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => solutionOptionApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    solutionOptions: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchSolutionOptions, // Now accepts params
    createSolutionOption: createSolutionOption.mutateAsync,
    updateSolutionOption: updateSolutionOption.mutateAsync,
    deleteSolutionOption: deleteSolutionOption.mutateAsync,
    restoreSolutionOption: restoreChecklist.mutateAsync,
  };
};

export default useSolutionOption;
