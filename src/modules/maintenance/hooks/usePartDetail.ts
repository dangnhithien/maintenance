import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import partDetailApi from "../apis/partDetailApi";
import { IPartDetail } from "../datas/partDetail/IPartDetail";
import { IPartDetailCreate } from "../datas/partDetail/IPartDetailCreate";
import { IPartDetailDelete } from "../datas/partDetail/IPartDetailDelete";
import { IPartDetailGet } from "../datas/partDetail/IPartDetailGet";

const KEY = "PartDetails";
export const usePartDetail = () => {
  const queryClient = useQueryClient();
  const [partDetails, setPartDetails] = useState<IPartDetail[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch function to be called manually
  const fetchPartDetails = async (params: IPartDetailGet) => {
    setLoading(true);
    setError(null);
    try {
      const response = await partDetailApi.get(params);
      setPartDetails(response?.result?.items || []);
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
  const createPartDetail = useMutation({
    mutationFn: (newData: IPartDetailCreate) => partDetailApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updatePartDetail = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: IPartDetailCreate;
    }) => partDetailApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deletePartDetail = useMutation({
    mutationFn: (data: IPartDetailDelete) =>
      partDetailApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restorePartDetail = useMutation({
    mutationFn: (ids: string[]) => partDetailApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    fetchPartDetails, // Function to manually fetch data
    createPartDetail: createPartDetail.mutateAsync,
    updatePartDetail: updatePartDetail.mutateAsync,
    deletePartDetail: deletePartDetail.mutateAsync,
    restorePartDetail: restorePartDetail.mutateAsync,
    partDetails,
    totalCount,
    loading,
    error,
  };
};

export default usePartDetail;
