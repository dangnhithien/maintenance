import productApi from "@modules/maintenance/apis/productApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
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
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (id) {
      productApi
        .getById(id)
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
        Chi tiết sản phẩm
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1">
            <strong>QR Code:</strong>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">{}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1">
            <strong>Serial Number:</strong>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">{product.serialNumber}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1">
            <strong>Loại thiết bị:</strong>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">{product.deviceId}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1">
            <strong>Ghi chú:</strong>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">
            {product.note || "Không có ghi chú"}
          </Typography>
        </Grid>
      </Grid>
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
