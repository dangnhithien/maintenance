import ImageBase64 from "@components/ImageBase64";
import productApi from "@modules/maintenance/apis/productApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import {
  Box,
  Chip,
  CircularProgress,
  Grid2,
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
    <Grid2 container spacing={1} direction={"row"}>
      {/* Sidebar */}
      <Grid2
        sx={{
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 1.5,
          p: 2,
          width: 300,
          position: "sticky",
          top: 20,
          alignSelf: "stretch", // Ensure the sidebar stretches with the content
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid2 mb={1}>
          <ImageBase64 imageData={product.image || ""} height={"220px"} />
        </Grid2>

        <Grid2 textAlign="center" mb={1}>
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
        </Grid2>

        <Grid2 container justifyContent={"center"}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, textAlign: "center", color: "#2d3748" }}
          >
            {product.device?.name}
          </Typography>
        </Grid2>

        <Grid2>
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
              value={
                product.lastMaintenanceDate
                  ? new Date(product.lastMaintenanceDate).toLocaleDateString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }
                    )
                  : ""
              }
            />
            <InfoItem
              label="Lần kế tiếp"
              value={
                product.nextMaintenanceReminder
                  ? new Date(
                      product.nextMaintenanceReminder
                    ).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : ""
              }
            />
            <InfoItem
              label="Đã bảo trì"
              value={product.maintenanceTimes?.toString() || "0"}
            />
            <InfoItem
              label="Chu kì"
              value={product.maintenanceCycle?.toString() || "N/A"}
            />
          </Stack>
          <Typography variant="body1" color="primary" fontWeight="bold">
            Ghi chú
          </Typography>
          <Stack px={2} py={1} spacing={1}>
            <Typography variant="caption" color="textSecondary">
              {product.note}
            </Typography>
          </Stack>
        </Grid2>
      </Grid2>

      {/* Main Content */}
      <Grid2 container direction={"column"} flex={1} gap={1}>
        <Grid2>
          <Wrapper title="Phiếu chờ duyệt">
            <Approval deviceId={id} />
          </Wrapper>
        </Grid2>

        <Grid2>
          <Wrapper title="Lịch sử quét">
            <TaskCheckList productId={id} />
          </Wrapper>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="body2" color="textSecondary">
      {label}:
    </Typography>
    <Typography variant="body2" color="info" fontWeight="bold">
      {value}
    </Typography>
  </Box>
);

export default ProductDetailNew;
