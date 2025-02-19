import ImageBase64 from "@components/ImageBase64";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { Box, Chip, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
interface Props {
  product: ProductDto;
}
const InfoProduct: React.FC<Props> = ({ product }) => {
  return (
    <Grid2
      sx={{
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 1.5,
        p: 2,
        width: 350,
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
          label={product.status === "Active" ? "NGỪNG HOẠT ĐỘNG" : "HOẠT ĐỘNG"}
          color={product.status === "Active" ? "error" : "success"}
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
          {product.name}
        </Typography>
      </Grid2>

      <Grid2>
        <Typography variant="body1" color="primary" fontWeight="bold">
          Thông tin
        </Typography>
        <Stack px={2} py={1} spacing={1}>
          <InfoItem label="Serial" value={product.serialNumber || ""} />
          <InfoItem label="Nhà cung cấp" value={product.supplier || ""} />
          <InfoItem label="Phiên bản" value={product.version || ""} />
          <InfoItem label="Loại thiết bị" value={product.device?.name || ""} />
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
  );
};
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box display="flex" justifyContent="flex-start">
    <Typography variant="body2" color="textSecondary" noWrap width={100}>
      {label}:
    </Typography>
    <Typography variant="body2" color="info" fontWeight="bold">
      {value}
    </Typography>
  </Box>
);
export default InfoProduct;
