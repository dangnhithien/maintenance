import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import deviceTypeApi from "../apis/deviceTypeApi";
import { IDeviceType } from "../datas/deviceType/IDeviceType";
import { IDeviceTypeCreate } from "../datas/deviceType/IDeviceTypeCreate";
import { IDeviceTypeDelete } from "../datas/deviceType/IDeviceTypeDelete";
import { IDeviceTypeGet } from "../datas/deviceType/IDeviceTypeGet";

const KEY = "DeviceTypes";
export const useDeviceType = () => {
  const queryClient = useQueryClient();
  const [deviceTypes, setDeviceTypes] = useState<IDeviceType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchDeviceTypes = async (params: IDeviceTypeGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceTypeApi.get(params);
      setDeviceTypes(response?.result?.items || []);
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
  const createDeviceType = useMutation({
    mutationFn: (newData: IDeviceTypeCreate) => deviceTypeApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateDeviceType = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IDeviceTypeCreate;
    }) => deviceTypeApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteDeviceType = useMutation({
    mutationFn: (data: IDeviceTypeDelete) =>
      deviceTypeApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreDeviceType = useMutation({
    mutationFn: (ids: string[]) => deviceTypeApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchDeviceTypes, // Function to manually fetch data
    createDeviceType: createDeviceType.mutateAsync,
    updateDeviceType: updateDeviceType.mutateAsync,
    deleteDeviceType: deleteDeviceType.mutateAsync,
    restoreDeviceType: restoreDeviceType.mutateAsync,
    deviceTypes,
    totalCount,
    loading,
    error,
  };
};

export default useDeviceType;
