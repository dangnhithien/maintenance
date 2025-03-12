import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import partCategoryApi from "../apis/partCategoryApi";
import { IPartCategory } from "../datas/partCategory/IPartCategory";
import { IPartCategoryCreate } from "../datas/partCategory/IPartCategoryCreate";
import { IPartCategoryDelete } from "../datas/partCategory/IPartCategoryDelete";
import { IPartCategoryGet } from "../datas/partCategory/IPartCategoryGet";

const KEY = "PartCategorys";
export const usePartCategory = () => {
  const queryClient = useQueryClient();
  const [partCategorys, setPartCategorys] = useState<IPartCategory[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchPartCategorys = async (params: IPartCategoryGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await partCategoryApi.get(params);
      setPartCategorys(response?.result?.items || []);
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
  const createPartCategory = useMutation({
    mutationFn: (newData: IPartCategoryCreate) => partCategoryApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updatePartCategory = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IPartCategoryCreate;
    }) => partCategoryApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deletePartCategory = useMutation({
    mutationFn: (data: IPartCategoryDelete) =>
      partCategoryApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restorePartCategory = useMutation({
    mutationFn: (ids: string[]) => partCategoryApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchPartCategorys, // Function to manually fetch data
    createPartCategory: createPartCategory.mutateAsync,
    updatePartCategory: updatePartCategory.mutateAsync,
    deletePartCategory: deletePartCategory.mutateAsync,
    restorePartCategory: restorePartCategory.mutateAsync,
    partCategorys,
    totalCount,
    loading,
    error,
  };
};

export default usePartCategory;
