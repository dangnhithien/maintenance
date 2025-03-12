import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

/* -------------------- 1. KHAI BÁO KIỂU DỮ LIỆU -------------------- */
interface Task {
  id: number;
  name: string; // Tên task
  device: string; // Thiết bị
  date: string; // Ngày
  status: string; // Trạng thái
  taskType: string; // Loại task
}

interface Case {
  id: number;
  name: string; // Tên case
  time: string; // Thời gian
  technician: string; // Kĩ thuật viên
  customer: string; // Khách hàng
  tasks: Task[]; // Danh sách task
}

/* -------------------- 2. MOCK DỮ LIỆU (Ví dụ) -------------------- */
const caseData: Case = {
  id: 1,
  name: "Case: Sửa lỗi phần mềm",
  time: "2025-03-11 14:30",
  technician: "Nguyễn Văn A",
  customer: "Công ty XYZ",
  tasks: [
    {
      id: 1,
      name: "Task 1",
      device: "Máy chủ",
      date: "2025-03-11",
      status: "Đã hoàn thành",
      taskType: "Bảo trì",
    },
    {
      id: 2,
      name: "Task 2",
      device: "Máy trạm",
      date: "2025-03-12",
      status: "Đang tiến hành",
      taskType: "Sửa chữa",
    },
    {
      id: 3,
      name: "Task 3",
      device: "Thiết bị ngoại vi",
      date: "2025-03-13",
      status: "Chưa bắt đầu",
      taskType: "Kiểm tra",
    },
  ],
};

/* -------------------- 3. COMPONENT CHÍNH -------------------- */
const CaseDetail: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Thông tin chung của Case */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: "none",
          backgroundColor: "inherit",
        }}
      >
        <CardHeader
          title={caseData.name}
          subheader={`Thời gian: ${caseData.time}`}
          titleTypographyProps={{
            variant: "h6",
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
          subheaderTypographyProps={{
            variant: "body2",
            color: "#424242",
            fontSize: "0.9rem",
          }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                sx={{ color: "#424242", fontSize: "0.9rem" }}
              >
                <strong>Kĩ thuật viên:</strong> {caseData.technician}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                sx={{ color: "#424242", fontSize: "0.9rem" }}
              >
                <strong>Khách hàng:</strong> {caseData.customer}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Danh sách Task */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 1, fontSize: "1rem" }}
      >
        Danh sách Task
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "none",
          backgroundColor: "inherit",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "inherit" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                STT
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Tên Task
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Thiết bị
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Ngày
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Trạng thái
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Loại Task
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {caseData.tasks.map((task, index) => (
              <TableRow
                key={task.id}
                sx={{
                  backgroundColor: "inherit",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "inherit",
                  },
                }}
              >
                <TableCell sx={{ fontSize: "0.9rem" }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: "0.9rem" }}>{task.name}</TableCell>
                <TableCell sx={{ fontSize: "0.9rem" }}>{task.device}</TableCell>
                <TableCell sx={{ fontSize: "0.9rem" }}>{task.date}</TableCell>
                <TableCell sx={{ fontSize: "0.9rem" }}>{task.status}</TableCell>
                <TableCell sx={{ fontSize: "0.9rem" }}>
                  {task.taskType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseDetail;
