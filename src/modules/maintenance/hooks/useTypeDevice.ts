import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import typeDeviceApi from "../apis/typeDeviceApi";
import { CreateTypeDeviceDto } from "../datas/typeDevice/CreateTypeDeviceDto";
import { DeleteTypeDeviceDto } from "../datas/typeDevice/DeleteTypeDeviceDto";
import { GetTypeDeviceDto } from "../datas/typeDevice/GetTypeDeviceDto";

const KEY = "typeDevices";
export const useTypeDevice = (initialParams?: GetTypeDeviceDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () => typeDeviceApi.get(initialParams).then((res) => res.result),
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
  const fetchTypeDevices = (newParams: GetTypeDeviceDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createTypeDevice = useMutation({
    mutationFn: (newData: CreateTypeDeviceDto) => typeDeviceApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateTypeDevice = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateTypeDeviceDto;
    }) => typeDeviceApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteTypeDevice = useMutation({
    mutationFn: (data: DeleteTypeDeviceDto) =>
      typeDeviceApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => typeDeviceApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    typeDevices: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchTypeDevices, // Now accepts params
    createTypeDevice: createTypeDevice.mutateAsync,
    updateTypeDevice: updateTypeDevice.mutateAsync,
    deleteTypeDevice: deleteTypeDevice.mutateAsync,
    restoreTypeDevice: restoreChecklist.mutateAsync,
  };
};

export default useTypeDevice;
