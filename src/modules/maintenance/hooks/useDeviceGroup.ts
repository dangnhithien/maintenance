import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import deviceGroupApi from "../apis/deviceGroupApi";
import { IDeviceGroup } from "../datas/deviceGroup/IDeviceGroup";
import { IDeviceGroupCreate } from "../datas/deviceGroup/IDeviceGroupCreate";
import { IDeviceGroupDelete } from "../datas/deviceGroup/IDeviceGroupDelete";
import { IDeviceGroupGet } from "../datas/deviceGroup/IDeviceGroupGet";

const KEY = "DeviceGroups";
export const useDeviceGroup = () => {
  const queryClient = useQueryClient();
  const [deviceGroups, setDeviceGroups] = useState<IDeviceGroup[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchDeviceGroups = async (params: IDeviceGroupGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceGroupApi.get(params);
      setDeviceGroups(response?.result?.items || []);
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
  const createDeviceGroup = useMutation({
    mutationFn: (newData: IDeviceGroupCreate) => deviceGroupApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateDeviceGroup = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IDeviceGroupCreate;
    }) => deviceGroupApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteDeviceGroup = useMutation({
    mutationFn: (data: IDeviceGroupDelete) =>
      deviceGroupApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreDeviceGroup = useMutation({
    mutationFn: (ids: string[]) => deviceGroupApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchDeviceGroups, // Function to manually fetch data
    createDeviceGroup: createDeviceGroup.mutateAsync,
    updateDeviceGroup: updateDeviceGroup.mutateAsync,
    deleteDeviceGroup: deleteDeviceGroup.mutateAsync,
    restoreDeviceGroup: restoreDeviceGroup.mutateAsync,
    deviceGroups,
    totalCount,
    loading,
    error,
  };
};

export default useDeviceGroup;
