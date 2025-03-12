import ImageBase64 from "@components/ImageBase64";
import { IDevice } from "@modules/maintenance/datas/device/IDevice";
import {
  Box,
  Checkbox,
  Paper,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <Box display="flex" alignItems="center" justifyContent="flex-start" mb={1}>
    <Typography variant="body2" color="textSecondary" mr={1}>
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
interface DeviceCardProps {
  data: IDevice;
  sx?: SxProps<Theme>;
  mode: string; // Chế độ hiện tại (vd: "selection", "chế độ khác", ...)
  linkBaseUrl: string; // URL cơ sở cho liên kết, sẽ kết hợp với deviceId
  onCheckDelete?: (deviceId: string, checked: boolean) => void;
}

const DeviceDetailItem: React.FC<DeviceCardProps> = ({
  data,
  sx,
  mode,
  onCheckDelete,
  linkBaseUrl,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckDelete?.(data.id, event.target.checked);
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        p: 2,
        ...sx,
        position: "relative",
        height: "100%",
      }}
    >
      {/* Hiển thị checkbox khi mode === "selection" */}
      {mode === "selection" && (
        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 100 }}>
          <Checkbox onChange={handleCheckboxChange} />
        </Box>
      )}

      {/* Ảnh thiết bị */}
      <Box
        pr={3}
        sx={{
          display: "flex",
          flexShrink: 0,
          width: "40%",
          justifyContent: "center", // Căn giữa theo chiều ngang
          alignItems: "center", // Căn giữa theo chiều dọc
          height: "100%", // Đảm bảo phần tử cha có chiều cao đầy đủ
        }}
      >
        <ImageBase64
          imageData={data.image || ""}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "500px",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Nội dung thông tin */}
      <Box sx={{ flex: 1 }}>
        <Link to={`${linkBaseUrl}/${data.id}`}>
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >
            {data.name}
          </Typography>
        </Link>
        <Typography fontWeight="bold" color="primary" mt={2}>
          Thông tin
        </Typography>
        <InfoItem label="Số serial" value={data.serialNumber} />
        <InfoItem label="Khách hàng" value={data.customer?.name || "-"} />
        <InfoItem label="Nhóm thiết bị" value={data.deviceModel?.name || "-"} />
      </Box>
    </Paper>
  );
};

export default DeviceDetailItem;
