import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import deviceModelApi from "../apis/deviceModelApi";
import { IDeviceModel } from "../datas/deviceModel/IDeviceModel";
import { IDeviceModelCreate } from "../datas/deviceModel/IDeviceModelCreate";
import { IDeviceModelDelete } from "../datas/deviceModel/IDeviceModelDelete";
import { IDeviceModelGet } from "../datas/deviceModel/IDeviceModelGet";

const KEY = "DeviceModels";
export const useDeviceModel = () => {
  const queryClient = useQueryClient();
  const [deviceModels, setDeviceModels] = useState<IDeviceModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchDeviceModels = async (params: IDeviceModelGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceModelApi.get(params);
      setDeviceModels(response?.result?.items || []);
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
  const createDeviceModel = useMutation({
    mutationFn: (newData: IDeviceModelCreate) => deviceModelApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateDeviceModel = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IDeviceModelCreate;
    }) => deviceModelApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteDeviceModel = useMutation({
    mutationFn: (data: IDeviceModelDelete) =>
      deviceModelApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreDeviceModel = useMutation({
    mutationFn: (ids: string[]) => deviceModelApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchDeviceModels, // Function to manually fetch data
    createDeviceModel: createDeviceModel.mutateAsync,
    updateDeviceModel: updateDeviceModel.mutateAsync,
    deleteDeviceModel: deleteDeviceModel.mutateAsync,
    restoreDeviceModel: restoreDeviceModel.mutateAsync,
    deviceModels,
    totalCount,
    loading,
    error,
  };
};

export default useDeviceModel;
