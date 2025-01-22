import { useCallback, useState } from "react";

import productApi from "../apis/productApi";
import { GetProductDto } from "../datas/product/GetProductDto";
import { ProductDto } from "../datas/product/ProductDto";

interface Result {
  products: ProductDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: GetProductDto) => Promise<void>;
}

const useProduct = (initialParams?: GetProductDto): Result => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchProducts = useCallback(async (params?: GetProductDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await productApi.get(params || initialParams);
      setProducts(result?.result?.items); // Set danh sách devices
      setTotalCount(result?.result.totalCount); // Set tổng số item
    } catch (err: any) {
      setError(err.message || "Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động fetch khi khởi tạo hook

  return {
    products,
    totalCount,
    loading,
    error,
    fetchProducts,
  };
};

export default useProduct;
