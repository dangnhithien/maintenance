import productApi from "@modules/maintenance/apis/productApi";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InputSearch from "../common/InputSearch";
import Wrapper from "../common/Wrapper";
import ProductRowDetail from "./ProductRowDetail";

const ProductListDetail = () => {
  // Số phần tử trên mỗi trang
  const PAGE_SIZE = 8;

  // Các tham số filter ban đầu
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "Device",
    searchTerm: "",
    takeCount: PAGE_SIZE, // Số phần tử trên mỗi trang
    // Lưu ý: skipCount sẽ được truyền theo số trang (page) riêng
  });

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [page, setPage] = useState<number>(0); // Số trang hiện tại (skipCount)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Khi thay đổi tìm kiếm (hoặc các tham số khác) thì reset lại danh sách, số trang và trạng thái còn dữ liệu
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [params.searchTerm]);

  // Gọi API load dữ liệu mỗi khi số trang (page) hoặc các tham số khác thay đổi
  useEffect(() => {
    // Nếu đã load hết dữ liệu và không phải trang đầu tiên thì không gọi API nữa
    if (!hasMore && page !== 0) return;

    setIsLoading(true);
    // Truyền skipCount là số trang hiện tại và takeCount là số phần tử trên mỗi trang
    productApi
      .getListProductDetail({
        ...params,
        skipCount: page * PAGE_SIZE,
        takeCount: PAGE_SIZE,
      })
      .then((res) => {
        // Nếu không còn dữ liệu trả về thì đánh dấu hasMore là false
        if ((page + 1) * PAGE_SIZE >= res.result.totalCount) {
          setHasMore(false);
        }
        // Nếu là trang đầu tiên thì thay thế danh sách, còn nếu không thì nối thêm vào danh sách hiện có
        if (page === 0) {
          setTotalCount(res.result.totalCount);
          setProducts(res.result.items);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...res.result.items]);
        }
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params, hasMore]);

  // Lắng nghe sự kiện cuộn trang: khi cuộn gần cuối trang sẽ tăng số trang để load thêm dữ liệu
  useEffect(() => {
    const container = document.getElementById("layoutContainer");
    if (!container) return;
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight + 100 >=
        container.scrollHeight
      ) {
        if (!isLoading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <Wrapper>
      <Box mb={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <InputSearch
            onSearch={(data) => {
              // Khi tìm kiếm, cập nhật searchTerm (và các tham số khác nếu cần)
              setParams((prev) => ({ ...prev, searchTerm: data }));
            }}
          />
          <Typography variant="body1" fontWeight={"bold"} color="primary">
            {totalCount} thiết bị
          </Typography>
        </Stack>
      </Box>
      {products.length === 0 && (
        <Typography variant="body1" textAlign={"center"} height={100}>
          No products
        </Typography>
      )}
      <Grid2 container spacing={2}>
        {products.map((item) => (
          <Grid2 key={item.id} size={12}>
            <ProductRowDetail data={item} />
          </Grid2>
        ))}
      </Grid2>
      {isLoading && <div>Loading...</div>}
    </Wrapper>
  );
};

export default ProductListDetail;
