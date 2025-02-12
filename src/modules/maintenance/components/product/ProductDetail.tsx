import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";

import ImageBase64 from "@components/ImageBase64";
import productApi from "@modules/maintenance/apis/productApi";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../common/Notistack";

interface Props {
  id?: string;
}
const ProductDetail: React.FC<Props> = ({ id }) => {
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
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
        Chi tiết
      </Typography>
      <Grid2 container direction={"row"} spacing={2}>
        <Grid2>
          <ImageBase64
            imageData={product.image || ""}
            width={200}
            height={200}
          />
        </Grid2>
        <Grid2 container spacing={2} flex={1}>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Số seri</strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">{product.serialNumber}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Tên</strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">{product.name}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Địa chỉ</strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">{product.address}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Ngày lắp đặt</strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">
                <span>
                  {product.installationDate &&
                    new Date(product.installationDate).toLocaleDateString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }
                    )}
                </span>
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Chu kì </strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">
                {product.maintenanceCycle}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Nhà cung cấp</strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">{product.supplier}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 size={3} direction={"column"}>
            <Grid2>
              <Typography variant="body1">
                <strong>Version</strong>
              </Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">{product.version}</Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/product/create/${product.id}`}
        >
          Chỉnh sửa
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductDetail;
