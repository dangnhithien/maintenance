import productApi from "@modules/maintenance/apis/productApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { CircularProgress, Grid2, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Approval from "../approval/Approval";
import InfoProduct from "../common/InfoProduct";
import { useNotification } from "../common/Notistack";
import Wrapper from "../common/Wrapper";
import TaskCheckList from "../taskCheck/TaskCheckList";

interface Props {
  id?: string;
}

const ProductDetailNew: React.FC<Props> = ({ id }) => {
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (id) {
      productApi
        .getById(id, { includeProperties: "Device" })
        .then((res) => setProduct(res.result)) // Cập nhật chi tiết sản phẩm
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!product) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="error">
          Không tìm thấy sản phẩm.
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid2 container spacing={1} direction="row" sx={{ height: "100%" }}>
      {/* Cột bên trái: Thông tin sản phẩm */}
      <Grid2 sx={{ display: "flex" }}>
        <InfoProduct product={product} />
      </Grid2>

      {/* Cột bên phải: Nội dung chính */}
      <Grid2
        size={6}
        container
        direction="column"
        gap={1}
        flex={1}
        sx={{ display: "flex" }}
      >
        <Grid2>
          <Wrapper title="Phiếu chờ duyệt" sx={{ width: "100%" }}>
            <Approval productId={id} />
          </Wrapper>
        </Grid2>

        <Grid2 sx={{ flex: 1 }}>
          <Wrapper title="Lịch sử quét" sx={{ width: "100%", height: "100%" }}>
            <TaskCheckList productId={id} />
          </Wrapper>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default ProductDetailNew;
