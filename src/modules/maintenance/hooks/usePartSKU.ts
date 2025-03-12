import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import partSKUApi from "../apis/partSKUApi";
import { IPartSKU } from "../datas/partSKU/IPartSKU";
import { IPartSKUCreate } from "../datas/partSKU/IPartSKUCreate";
import { IPartSKUDelete } from "../datas/partSKU/IPartSKUDelete";
import { IPartSKUGet } from "../datas/partSKU/IPartSKUGet";

const KEY = "PartSKUs";
export const usePartSKU = () => {
  const queryClient = useQueryClient();
  const [partSKUs, setPartSKUs] = useState<IPartSKU[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchPartSKUs = async (params: IPartSKUGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await partSKUApi.get(params);
      setPartSKUs(response?.result?.items || []);
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
  const createPartSKU = useMutation({
    mutationFn: (newData: IPartSKUCreate) => partSKUApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updatePartSKU = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IPartSKUCreate;
    }) => partSKUApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deletePartSKU = useMutation({
    mutationFn: (data: IPartSKUDelete) =>
      partSKUApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restorePartSKU = useMutation({
    mutationFn: (ids: string[]) => partSKUApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchPartSKUs, // Function to manually fetch data
    createPartSKU: createPartSKU.mutateAsync,
    updatePartSKU: updatePartSKU.mutateAsync,
    deletePartSKU: deletePartSKU.mutateAsync,
    restorePartSKU: restorePartSKU.mutateAsync,
    partSKUs,
    totalCount,
    loading,
    error,
  };
};

export default usePartSKU;
