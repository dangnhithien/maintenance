import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import deviceSKUApi from "../apis/deviceSKUApi";
import { IDeviceSKU } from "../datas/deviceSKU/IDeviceSKU";
import { IDeviceSKUCreate } from "../datas/deviceSKU/IDeviceSKUCreate";
import { IDeviceSKUDelete } from "../datas/deviceSKU/IDeviceSKUDelete";
import { IDeviceSKUGet } from "../datas/deviceSKU/IDeviceSKUGet";

const KEY = "DeviceSKUs";
export const useDeviceSKU = () => {
  const queryClient = useQueryClient();
  const [deviceSKUs, setDeviceSKUs] = useState<IDeviceSKU[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchDeviceSKUs = async (params: IDeviceSKUGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deviceSKUApi.get(params);
      setDeviceSKUs(response?.result?.items || []);
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
  const createDeviceSKU = useMutation({
    mutationFn: (newData: IDeviceSKUCreate) => deviceSKUApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateDeviceSKU = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IDeviceSKUCreate;
    }) => deviceSKUApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteDeviceSKU = useMutation({
    mutationFn: (data: IDeviceSKUDelete) =>
      deviceSKUApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreDeviceSKU = useMutation({
    mutationFn: (ids: string[]) => deviceSKUApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchDeviceSKUs, // Function to manually fetch data
    createDeviceSKU: createDeviceSKU.mutateAsync,
    updateDeviceSKU: updateDeviceSKU.mutateAsync,
    deleteDeviceSKU: deleteDeviceSKU.mutateAsync,
    restoreDeviceSKU: restoreDeviceSKU.mutateAsync,
    deviceSKUs,
    totalCount,
    loading,
    error,
  };
};

export default useDeviceSKU;
