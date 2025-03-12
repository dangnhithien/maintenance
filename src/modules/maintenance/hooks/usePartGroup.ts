import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import partGroupApi from "../apis/partGroupApi";
import { IPartGroup } from "../datas/partGroup/IPartGroup";
import { IPartGroupCreate } from "../datas/partGroup/IPartGroupCreate";
import { IPartGroupDelete } from "../datas/partGroup/IPartGroupDelete";
import { IPartGroupGet } from "../datas/partGroup/IPartGroupGet";

const KEY = "PartGroups";
export const usePartGroup = () => {
  const queryClient = useQueryClient();
  const [partGroups, setPartGroups] = useState<IPartGroup[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchPartGroups = async (params: IPartGroupGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await partGroupApi.get(params);
      setPartGroups(response?.result?.items || []);
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
  const createPartGroup = useMutation({
    mutationFn: (newData: IPartGroupCreate) => partGroupApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updatePartGroup = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IPartGroupCreate;
    }) => partGroupApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deletePartGroup = useMutation({
    mutationFn: (data: IPartGroupDelete) =>
      partGroupApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restorePartGroup = useMutation({
    mutationFn: (ids: string[]) => partGroupApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchPartGroups, // Function to manually fetch data
    createPartGroup: createPartGroup.mutateAsync,
    updatePartGroup: updatePartGroup.mutateAsync,
    deletePartGroup: deletePartGroup.mutateAsync,
    restorePartGroup: restorePartGroup.mutateAsync,
    partGroups,
    totalCount,
    loading,
    error,
  };
};

export default usePartGroup;
