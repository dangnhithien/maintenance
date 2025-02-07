import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import Approval from "../approval/Approval";
import TaskCheckList from "../taskCheck/TaskCheckList";

const mockDevice = {
  name: "Industrial Pump Model X200",
  status: "Active",
  serialNumber: "SN-9876543210",
  location: "Factory B - Section 3",
  imageUrl:
    "https://linx.com.vn/wp-content/uploads/2022/10/may-in-date-linx-8830.jpg",
  inspectionHistory: [
    { date: "01/02/2025", result: "Passed" },
    { date: "15/01/2025", result: "Passed" },
    { date: "05/01/2025", result: "Failed" },
  ],
  todayInspectionHistory: [
    { time: "09:00 AM", result: "Passed" },
    { time: "01:00 PM", result: "Pending" },
  ],
  pendingForms: [
    { name: "Form A", date: "06/02/2025" },
    { name: "Form B", date: "05/02/2025" },
    { name: "Form C", date: "03/02/2025" },
  ],
};

const DeviceDetailPageTest: React.FC = () => {
  return (
    <Box
      display="flex"
      p={4}
      gap={1}
      sx={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Sidebar */}
      <Box
        bgcolor="white"
        boxShadow={3}
        borderRadius={4}
        p={3}
        sx={{ width: 300, position: "sticky", top: 20, height: "fit-content" }}
      >
        <img
          src={mockDevice.imageUrl}
          alt="Device"
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 24,
          }}
        />

        <Box textAlign="center" mb={3}>
          <Chip
            label={
              mockDevice.status === "Active" ? "HOẠT ĐỘNG" : "NGỪNG HOẠT ĐỘNG"
            }
            color={mockDevice.status === "Active" ? "success" : "error"}
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
          sx={{ fontWeight: 700, textAlign: "center", color: "#2d3748", mb: 3 }}
        >
          {mockDevice.name}
        </Typography>

        <Box>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Thông tin
          </Typography>
          <Stack p={2} spacing={1}>
            <InfoItem label="Serial" value={mockDevice.serialNumber} />
            <InfoItem label="Nhà cung cấp" value="VMS" />
            <InfoItem label="Phiên bản" value="2002" />
            <InfoItem label="Loại thiết bị" value="Máy in" />
          </Stack>

          <Typography variant="h6" color="primary" fontWeight="bold" mt={2}>
            Lịch Bảo Trì
          </Typography>
          <Stack p={2} spacing={1}>
            <InfoItem label="Lần gần nhất" value="19/02/2025" />
            <InfoItem label="Lần kế tiếp" value="19/02/2025" />
            <InfoItem label="Đã bảo trì" value="8 lần" />
            <InfoItem label="Chu kì" value="8 tuần" />
          </Stack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex={1} display="flex" flexDirection="column" gap={1}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2 }}
              color="primary"
            >
              Lịch Sử Kiểm Tra
            </Typography>
            <TaskCheckList />
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2 }}
              color="primary"
            >
              Biểu Mẫu Chờ Duyệt
            </Typography>
            <Approval />
          </CardContent>
        </Card>
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

export default DeviceDetailPageTest;
