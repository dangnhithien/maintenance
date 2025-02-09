import productApi from "@modules/maintenance/apis/productApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Approval from "../approval/Approval";
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
    <Box display="flex" gap={1}>
      {/* Sidebar */}
      <Box
        bgcolor="white"
        boxShadow={3}
        borderRadius={1.5}
        p={2}
        sx={{ width: 300, position: "sticky", top: 20, height: "fit-content" }}
      >
        <img
          src={
            product?.imageUrl ||
            "https://linx.com.vn/wp-content/uploads/2022/10/may-in-date-linx-8830.jpg"
          }
          alt="Device"
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 8,
          }}
        />

        <Box textAlign="center" mb={1}>
          <Chip
            label={
              product.status === "Active" ? "HOẠT ĐỘNG" : "NGỪNG HOẠT ĐỘNG"
            }
            color={product.status === "Active" ? "success" : "error"}
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
              padding: "4px 8px",
              textTransform: "uppercase",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, textAlign: "center", color: "#2d3748" }}
        >
          {product.device?.name}
        </Typography>

        <Box>
          <Typography variant="body1" color="primary" fontWeight="bold">
            Thông tin
          </Typography>
          <Stack px={2} py={1} spacing={1}>
            <InfoItem label="Serial" value={product.serialNumber} />
            <InfoItem label="Nhà cung cấp" value={product.supplier} />
            <InfoItem label="Phiên bản" value={product.version} />
            <InfoItem label="Loại thiết bị" value="" />
          </Stack>

          <Typography variant="body1" color="primary" fontWeight="bold">
            Lịch Bảo Trì
          </Typography>
          <Stack px={2} py={1} spacing={1}>
            <InfoItem
              label="Lần gần nhất"
              value={product.lastMaintenanceDate?.toISOString()}
            />
            <InfoItem
              label="Lần kế tiếp"
              value={product.nextMaintenanceReminder?.toISOString()}
            />
            <InfoItem
              label="Đã bảo trì"
              value={product.maintenanceTimes?.toString()}
            />
            <InfoItem
              label="Chu kì"
              value={product.maintenanceCycle?.toString()}
            />
          </Stack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex={1} display="flex" flexDirection="column" gap={1}>
        <Wrapper title="Phiếu chờ duyệt">
          <Approval deviceId={id} />
        </Wrapper>

        <Wrapper title="Lịch sử quét">
          <TaskCheckList productId={id} />
        </Wrapper>
      </Box>
    </Box>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="body2" color="textSecondary">
      {label}:
    </Typography>
    <Typography variant="body2" color="primary" fontWeight="500">
      {value}
    </Typography>
  </Box>
);

export default ProductDetailNew;
