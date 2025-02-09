import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import productApi from "../apis/productApi";
import { CreateProductDto } from "../datas/product/CreateProductDto";
import { DeleteProductDto } from "../datas/product/DeleteProductDto";
import { GetProductDto } from "../datas/product/GetProductDto";

const KEY = "Products";
export const useProduct = (initialParams?: GetProductDto) => {
  const queryClient = useQueryClient();

  // Fetch template checklists
  const { data, isPending, isError, error } = useQuery({
    queryKey: [KEY, initialParams], // Dynamic queryKey
    queryFn: () => productApi.get(initialParams).then((res) => res.result),
    staleTime: 60000,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (
        axiosError?.response?.status === 400 ||
        axiosError?.response?.status === 401
      ) {
        return false; // Không retry với lỗi Bad Request hoặc Unauthorized
      }
      return failureCount < 3; // Retry với các lỗi khác
    },
  });

  // Function to manually refetch with new params
  const fetchProducts = (newParams: GetProductDto) => {
    queryClient.invalidateQueries({
      queryKey: [KEY, newParams],
    });
  };
  const getListProductDetail = async (newParams: GetProductDto) => {
    return queryClient.fetchQuery({
      queryKey: [KEY, "product-list-detail"],
      queryFn: () =>
        productApi.getListProductDetail(newParams).then((res) => res.result),
    });
  };

  // Create a new checklist
  const createProduct = useMutation({
    mutationFn: (newData: CreateProductDto) => productApi.post(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }); // Refresh list
    },
  });

  // Update a checklist
  const updateProduct = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: CreateProductDto;
    }) => productApi.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  // Delete a checklist
  const deleteProduct = useMutation({
    mutationFn: (data: DeleteProductDto) =>
      productApi.delete(data.isHardDeleted, data.ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  const restoreChecklist = useMutation({
    mutationFn: (ids: string[]) => productApi.restore(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    products: data?.items || [],
    totalCount: data?.totalCount || 0,
    loading: isPending,
    error: isError ? error?.message : null,
    fetchProducts, // Now accepts params
    getListProductDetail, // Returns
    createProduct: createProduct.mutateAsync,
    updateProduct: updateProduct.mutateAsync,
    deleteProduct: deleteProduct.mutateAsync,
    restoreProduct: restoreChecklist.mutateAsync,
  };
};

export default useProduct;
