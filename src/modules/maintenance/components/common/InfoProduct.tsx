import ImageBase64 from "@components/ImageBase64";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Chip,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  product: ProductDto;
}

const InfoProduct: React.FC<Props> = ({ product }) => {
  return (
    <Grid2
      sx={{
        bgcolor: "white",
        width: 400,
        position: "sticky",
        top: 20,
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        p: 3,
        boxShadow: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      {/* Nút chỉnh sửa */}
      <Box display="flex" justifyContent="flex-end">
        <Link to={`/product/create/${product.id}`}>
          <IconButton color="primary">
            <EditIcon color="action" fontSize="small" />
          </IconButton>
        </Link>
      </Box>

      {/* Hình ảnh sản phẩm */}
      <Box mb={2}>
        <ImageBase64 imageData={product.image || ""} height="220px" />
      </Box>

      {/* Trạng thái sản phẩm */}
      <Box textAlign="center" mb={2}>
        <Chip
          label={product.status === "Active" ? "NGỪNG HOẠT ĐỘNG" : "HOẠT ĐỘNG"}
          color={product.status === "Active" ? "error" : "success"}
          sx={{
            fontWeight: 600,
            fontSize: "0.85rem",
            padding: "4px 8px",
            textTransform: "uppercase",
          }}
          size="small"
        />
      </Box>

      {/* Tên sản phẩm */}
      <Box textAlign="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2d3748" }}>
          {product.name}
        </Typography>
      </Box>

      {/* Thông tin sản phẩm */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          color="primary"
          fontWeight="bold"
          gutterBottom
        >
          Thông tin
        </Typography>
        <Stack spacing={1}>
          <InfoItem label="Serial" value={product.serialNumber || ""} />
          <InfoItem label="Nhà cung cấp" value={product.supplier || ""} />
          <InfoItem label="Khách hàng" value={product.customer?.name || ""} />
          <InfoItem label="Nhóm thiết bị" value={product.device?.name || ""} />
          <InfoItem
            label="Ngày lắp đặt"
            value={
              product.installationDate
                ? new Date(product.installationDate).toLocaleDateString(
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
        </Stack>
      </Box>

      {/* Lịch bảo trì */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          color="primary"
          fontWeight="bold"
          gutterBottom
        >
          Lịch Bảo Trì
        </Typography>
        <Stack spacing={1}>
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
                ? new Date(product.nextMaintenanceReminder).toLocaleDateString(
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
            label="Đã bảo trì"
            value={product.maintenanceTimes?.toString() || "0"}
          />
          <InfoItem
            label="Chu kì"
            value={product.maintenanceCycle?.toString() || "N/A"}
          />
        </Stack>
        {product.note && (
          <Box mt={2} px={2}>
            <Typography variant="caption" color="textSecondary">
              {product.note}
            </Typography>
          </Box>
        )}
      </Box>
    </Grid2>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Typography variant="body2" color="textSecondary" sx={{ minWidth: 120 }}>
      {label}:
    </Typography>
    <Tooltip title={value}>
      <Typography
        variant="body2"
        color="info"
        fontWeight="bold"
        sx={{
          textAlign: "right",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "calc(100% - 120px)", // Giới hạn chiều rộng cho phần value
        }}
      >
        {value || "-"}
      </Typography>
    </Tooltip>
  </Box>
);

export default InfoProduct;
