import productApi from "@modules/maintenance/apis/productApi";
import { unwrapListReponse } from "@modules/maintenance/datas/comon/ApiResponse";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { Box, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import InputSearch from "../common/InputSearch";
import ProductRowDetail from "./ProductRowDetail";

const ProductListDetail = () => {
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "Device",
  });
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    productApi
      .getListProductDetail(params)
      .then(unwrapListReponse)
      .then((products) => setProducts(products));
  }, [params]);

  return (
    <>
      <Box mb={2}>
        <InputSearch
          onSearch={(data) => {
            setParams({ ...params, searchTerm: data });
          }}
        />
      </Box>
      <Grid2 container spacing={1}>
        {products.map((item) => (
          <Grid2 key={item.id} size={12}>
            <ProductRowDetail data={item} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ProductListDetail;
