import { CreateTemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/CreateTemplateCheckListDto";
import { DeleteTemplateCheckDto } from "@modules/maintenance/datas/templateCheckList/DeleteTemplateCheckDto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import templateCheckListApi from "../apis/templateCheckListApi";
import { GetTemplateCheckListDto } from "../datas/templateCheckList/GetTemplateCheckListDto";

const KEY = "templateChecks";
export const useTemplateCheckList = (
  initialParams?: GetTemplateCheckListDto
) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () =>
      templateCheckListApi.get(initialParams).then((res) => res.result),
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
  const fetchTemplateChecklists = (newParams: GetTemplateCheckListDto) => {
    console.log("newParams", newParams);
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createChecklist = useMutation({
    mutationFn: (newData: CreateTemplateCheckListDto) =>
      templateCheckListApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateChecklist = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateTemplateCheckListDto;
    }) => templateCheckListApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteChecklist = useMutation({
    mutationFn: (data: DeleteTemplateCheckDto) =>
      templateCheckListApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });
  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => templateCheckListApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    templateCheckLists: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchTemplateChecklists, // Now accepts params
    createChecklist: createChecklist.mutateAsync,
    updateChecklist: updateChecklist.mutateAsync,
    deleteChecklist: deleteChecklist.mutateAsync,
    restoreChecklist: restoreChecklist.mutateAsync,
  };
};

export default useTemplateCheckList;
