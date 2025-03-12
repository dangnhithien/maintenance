import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import deviceApi from "../apis/deviceApi";
import { IDevice } from "../datas/device/IDevice";
import { IDeviceCreate } from "../datas/device/IDeviceCreate";
import { IDeviceDelete } from "../datas/device/IDeviceDelete";
import { IDeviceGet } from "../datas/device/IDeviceGet";

const KEY = "Devices";
export const useDevice = () => {
  const queryClient = useQueryClient();
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchDevices = async (params: IDeviceGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceApi.get(params);
      setDevices(response?.result?.items || []);
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
  const createDevice = useMutation({
    mutationFn: (newData: IDeviceCreate) => deviceApi.post(newData),
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
      updatedData: IDeviceCreate;
    }) => deviceApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteDevice = useMutation({
    mutationFn: (data: IDeviceDelete) =>
      deviceApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreDevice = useMutation({
    mutationFn: (ids: string[]) => deviceApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchDevices, // Function to manually fetch data
    createDevice: createDevice.mutateAsync,
    updateDevice: updateDevice.mutateAsync,
    deleteDevice: deleteDevice.mutateAsync,
    restoreDevice: restoreDevice.mutateAsync,
    devices,
    totalCount,
    loading,
    error,
  };
};

export default useDevice;
