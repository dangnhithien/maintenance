import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import partTypeApi from "../apis/partTypeApi";
import { IPartType } from "../datas/partType/IPartType";
import { IPartTypeCreate } from "../datas/partType/IPartTypeCreate";
import { IPartTypeDelete } from "../datas/partType/IPartTypeDelete";
import { IPartTypeGet } from "../datas/partType/IPartTypeGet";

const KEY = "PartTypes";
export const usePartType = () => {
  const queryClient = useQueryClient();
  const [partTypes, setPartTypes] = useState<IPartType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchPartTypes = async (params: IPartTypeGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await partTypeApi.get(params);
      setPartTypes(response?.result?.items || []);
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
  const createPartType = useMutation({
    mutationFn: (newData: IPartTypeCreate) => partTypeApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updatePartType = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IPartTypeCreate;
    }) => partTypeApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deletePartType = useMutation({
    mutationFn: (data: IPartTypeDelete) =>
      partTypeApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restorePartType = useMutation({
    mutationFn: (ids: string[]) => partTypeApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchPartTypes, // Function to manually fetch data
    createPartType: createPartType.mutateAsync,
    updatePartType: updatePartType.mutateAsync,
    deletePartType: deletePartType.mutateAsync,
    restorePartType: restorePartType.mutateAsync,
    partTypes,
    totalCount,
    loading,
    error,
  };
};

export default usePartType;
