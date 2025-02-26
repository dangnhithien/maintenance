import { unwrapListReponse } from "@datas/comon/ApiResponse";
import productApi from "@modules/maintenance/apis/productApi";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import userApi from "@modules/user/apis/UserApi";
import { UserDto } from "@modules/user/datas/user/UserDto";
import { Box, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import AssigneeCard from "./AssigneeCard";

const AdminAssignee = () => {
  // Số phần tử trên mỗi trang
  const PAGE_SIZE = 4;

  // Các tham số filter ban đầu
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "Customer",
    searchTerm: "",
    takeCount: PAGE_SIZE,
  });

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [technicians, setTechnicians] = useState<UserDto[]>([]);
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

  // Gọi API load danh sách sản phẩm mỗi khi số trang (page) hoặc các tham số khác thay đổi
  useEffect(() => {
    if (!hasMore && page !== 0) return;

    setIsLoading(true);
    productApi
      .getListProductDetail({
        ...params,
        skipCount: page * PAGE_SIZE,
        takeCount: PAGE_SIZE,
      })
      .then((res) => {
        if ((page + 1) * PAGE_SIZE >= res.result.totalCount) {
          setHasMore(false);
        }
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

  // Gọi API lấy danh sách kĩ thuật viên
  useEffect(() => {
    userApi
      .get({
        includeProperties: "Customer",
      })
      .then(unwrapListReponse)
      .then((res) => {
        // Giả sử res.result.items chứa danh sách user với các trường id và name
        setTechnicians(res);
      })
      .catch((error) => {
        console.error("Error loading technicians:", error);
      });
  }, []);

  // Lắng nghe sự kiện cuộn trang: khi cuộn gần cuối trang sẽ tăng số trang để load thêm dữ liệu
  useEffect(() => {
    const container = document.getElementById("layoutContainer");
    if (!container) return;
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight + 200 >=
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
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Grid2 container spacing={2}>
        {products.map((product) => (
          <AssigneeCard
            key={product.id}
            product={product}
            technicians={technicians}
          />
        ))}
      </Grid2>
    </Box>
  );
};

export default AdminAssignee;
