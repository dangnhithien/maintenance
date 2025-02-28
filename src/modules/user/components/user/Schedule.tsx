import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { JSX, useEffect, useRef } from "react";

// Một công việc/ca làm việc
export interface Task {
  id: number;
  name: string; // Tên công việc
  start: string; // "HH:mm" (24h)
  end: string; // "HH:mm" (24h)
  color?: string; // Màu ô (nếu cần)
}

// Mỗi nhân viên
export interface Employee {
  id: number;
  name: string; // Tên nhân viên
  tasks: Task[]; // Danh sách công việc thực tế
  plannedTasks?: Task[]; // Danh sách công việc kế hoạch
}

export const employeesMockData: Employee[] = [
  {
    id: 1,
    name: "Trịnh Văn Kim",
    tasks: [
      {
        id: 101,
        name: "Họp chuyển team",
        start: "08:30",
        end: "09:30",
        color: "#1976d2",
      },
      {
        id: 102,
        name: "Thiết kế module A",
        start: "10:00",
        end: "12:00",
        color: "#388e3c",
      },
    ],
    plannedTasks: [
      {
        id: 103,
        name: "Review document",
        start: "13:00",
        end: "14:30",
        color: "#ff5722",
      },
      {
        id: 104,
        name: "Client call",
        start: "15:00",
        end: "16:00",
        color: "#009688",
      },
    ],
  },
  {
    id: 2,
    name: "Đinh Lành Phượng",
    tasks: [
      {
        id: 201,
        name: "Tạo báo cáo",
        start: "09:00",
        end: "11:30",
        color: "#7b1fa2",
      },
      {
        id: 202,
        name: "Kiểm thử tính năng B",
        start: "13:00",
        end: "15:00",
        color: "#f57c00",
      },
    ],
    plannedTasks: [
      {
        id: 203,
        name: "Design review",
        start: "10:00",
        end: "11:00",
        color: "#3f51b5",
      },
      {
        id: 204,
        name: "Team sync",
        start: "16:00",
        end: "17:00",
        color: "#8bc34a",
      },
    ],
  },
  {
    id: 3,
    name: "Mai Nguyễn Việt Bình",
    tasks: [
      {
        id: 301,
        name: "Họp khách hàng",
        start: "08:30",
        end: "09:00",
        color: "#d32f2f",
      },
      {
        id: 302,
        name: "Phát triển API",
        start: "14:00",
        end: "17:00",
        color: "#0288d1",
      },
    ],
    plannedTasks: [
      {
        id: 303,
        name: "Code review",
        start: "09:00",
        end: "10:00",
        color: "#e91e63",
      },
      {
        id: 304,
        name: "Documentation",
        start: "13:00",
        end: "14:00",
        color: "#00bcd4",
      },
    ],
  },
];

// Mảng 24 giờ từ 0 đến 23
const HOURS = Array.from({ length: 24 }, (_, i) => i);

/**
 * Hàm render các ô cho một dòng (actual hay planned).
 * Nếu một task kéo dài qua nhiều giờ (chỉ xét giờ làm tròn), sẽ render 1 ô duy nhất với colSpan tương ứng.
 */
function renderTaskCells(tasks: Task[]): JSX.Element[] {
  const cells: JSX.Element[] = [];
  let hour = 0;
  // Sắp xếp tasks theo giờ bắt đầu
  const sortedTasks = [...tasks].sort(
    (a, b) =>
      parseInt(a.start.split(":")[0], 10) - parseInt(b.start.split(":")[0], 10)
  );
  while (hour < 24) {
    // Tìm task có bắt đầu đúng tại giờ hiện tại
    const task = sortedTasks.find(
      (t) => parseInt(t.start.split(":")[0], 10) === hour
    );
    if (task) {
      const startHour = parseInt(task.start.split(":")[0], 10);
      const endHour = parseInt(task.end.split(":")[0], 10);
      // Nếu task có phút không phải 00 thì có thể tính toán thêm, ở đây ta chỉ làm tròn theo giờ.
      const colspan = endHour - startHour || 1;
      cells.push(
        <TableCell
          key={hour}
          align="center"
          sx={{
            backgroundColor: task.color || "#1976d2",
            color: "#fff",
            cursor: "pointer",
            padding: "6px 4px",
            fontSize: "0.75rem",
            "&:hover": { opacity: 0.8 },
            border: "1px solid #fff",
            borderRight: "2px solid #fff",
            minWidth: "200px",
          }}
          colSpan={colspan}
        >
          <Box sx={{ display: "flex", gap: 1, padding: "4px" }}>
            <Tooltip title={task.name} arrow>
              <span style={{ whiteSpace: "nowrap" }}>{task.name}</span>
            </Tooltip>
          </Box>
        </TableCell>
      );
      hour += colspan;
    } else {
      // Nếu không có task bắt đầu tại giờ này, render ô trống
      cells.push(
        <TableCell
          key={hour}
          align="center"
          sx={{ padding: "6px 4px", minWidth: "200px" }}
        />
      );
      hour++;
    }
  }
  return cells;
}

interface SchedulerGridProps {
  employees?: Employee[];
}

const SchedulerGrid: React.FC<SchedulerGridProps> = ({
  employees = employeesMockData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Tính toán offset: 200px (Nhân viên) + 100px (Loại) + 8 * 200px (cho 8h)
      containerRef.current.scrollLeft = 200 + 100 + 6 * 200;
    }
  }, []);

  return (
    <Box p={2}>
      {/* Header: Ngày và nút chuyển chế độ xem */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Tháng 2 27, 2025</Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 1, fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Ngày
          </Button>
          <Button
            variant="outlined"
            sx={{ mr: 1, fontSize: "0.8rem", padding: "4px 8px" }}
          >
            3 ngày
          </Button>
          <Button
            variant="outlined"
            sx={{ mr: 1, fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Tuần
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Tháng
          </Button>
        </Box>
      </Box>

      {/* Bọc TableContainer với overflowX để tạo scroll ngang phần giờ */}
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto" }}
        ref={containerRef}
      >
        {/* minWidth: 200 (Nhân viên) + 100 (Loại) + 24*200 (giờ) */}
        <Table
          size="small"
          sx={{ tableLayout: "fixed", minWidth: 200 + 100 + 24 * 200 }}
        >
          <TableHead>
            <TableRow>
              {/* Cột "Nhân viên" cố định */}
              <TableCell
                sx={{
                  width: 200,
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#fff",
                  zIndex: 3,
                }}
              >
                Nhân viên
              </TableCell>
              {/* Cột "Loại" cố định */}
              <TableCell
                sx={{
                  width: 100,
                  fontWeight: "bold",
                  position: "sticky",
                  left: 200,
                  backgroundColor: "#fff",
                  zIndex: 2,
                }}
              >
                Loại
              </TableCell>
              {HOURS.map((hour) => (
                <TableCell
                  key={hour}
                  sx={{
                    padding: "6px 4px",
                    fontSize: "0.75rem",
                    minWidth: "200px",
                  }}
                >
                  {hour}:00
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => {
              const actualTasks = emp.tasks;
              const plannedTasks = emp.plannedTasks || [];
              return (
                <React.Fragment key={emp.id}>
                  {/* Dòng "Thực tế" */}
                  <TableRow sx={{ height: "35px" }}>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        verticalAlign: "top",
                        padding: "6px 8px",
                        position: "sticky",
                        left: 0,
                        backgroundColor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {emp.name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        padding: "6px 4px",
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        position: "sticky",
                        left: 200,
                        backgroundColor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      Thực tế
                    </TableCell>
                    {renderTaskCells(actualTasks)}
                  </TableRow>
                  {/* Dòng "Kế hoạch" */}
                  <TableRow sx={{ height: "35px" }}>
                    <TableCell
                      align="center"
                      sx={{
                        padding: "6px 4px",
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        color: "#555",
                        position: "sticky",
                        left: 200,
                        backgroundColor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      Kế hoạch
                    </TableCell>
                    {renderTaskCells(plannedTasks)}
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SchedulerGrid;
