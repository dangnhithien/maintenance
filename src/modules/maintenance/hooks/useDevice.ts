import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import deviceApi from "../apis/deviceApi";
import { CreateDeviceDto } from "../datas/device/CreateDeviceDto";
import { DeleteDeviceDto } from "../datas/device/DeleteDeviceDto";
import { GetDeviceDto } from "../datas/device/GetDeviceDto";

const KEY = "Devices";
export const useDevice = (initialParams?: GetDeviceDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () => deviceApi.get(initialParams).then((res) => res.result),
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
  const fetchDevices = (newParams: GetDeviceDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };

  // Create a new checklist
  const createDevice = useMutation({
    mutationFn: (newData: CreateDeviceDto) => deviceApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateDevice = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateDeviceDto;
    }) => deviceApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteDevice = useMutation({
    mutationFn: (data: DeleteDeviceDto) =>
      deviceApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => deviceApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    devices: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchDevices, // Now accepts params
    createDevice: createDevice.mutateAsync,
    updateDevice: updateDevice.mutateAsync,
    deleteDevice: deleteDevice.mutateAsync,
    restoreDevice: restoreChecklist.mutateAsync,
  };
};

export default useDevice;
