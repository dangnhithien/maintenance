import { ReactECharts } from "@components/ReactChart";
import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import Wrapper from "@modules/maintenance/components/common/Wrapper";
// import LineChartProduct from "@modules/maintenance/components/dashboard/components/LineChartProduct";
import TaskCheckOverview from "@modules/maintenance/components/taskCheck/components/TaskcheckOverview";
import TaskCheckList from "@modules/maintenance/components/taskCheck/TaskCheckList";
import userApi from "@modules/user/apis/UserApi";
import { UserDto } from "@modules/user/datas/user/UserDto";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Grid2,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import * as echarts from "echarts";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Device {
  id: string;
  name: string;
  date: string; // định dạng YYYY-MM-DD
}

function getSevenDayRange(inputDate: string): { fromDate: Date; toDate: Date } {
  const date = new Date(inputDate);
  const fromDate = new Date(date);
  fromDate.setDate(date.getDate() - 3);
  const toDate = new Date(date);
  toDate.setDate(date.getDate() + 3);
  return { fromDate, toDate };
}
function getOneDayRange(dateStr: string): { fromDate: Date; toDate: Date } {
  const fromDate = new Date(dateStr);
  const toDate = new Date(fromDate);
  toDate.setDate(fromDate.getDate() + 1);
  return { fromDate, toDate };
}

const EmployeeDetails: React.FC<{ user: UserDto }> = ({ user }) => (
  <Paper
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        position: "relative",
        height: 150,
        background: "linear-gradient(135deg, #002f77, #3F3D56)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 1,
          zIndex: 10,
        }}
      >
        <Tooltip title="Giao việc">
          <IconButton
            size="small"
            sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          >
            <Link to="/assignee">
              <WorkIcon fontSize="small" />
            </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            size="small"
            sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          >
            <Link to={`/user/create/${user?.id}`}>
              <EditIcon fontSize="small" />
            </Link>
          </IconButton>
        </Tooltip>
      </Box>

      <Avatar
        src={""}
        alt={user?.fullname}
        sx={{
          width: 100,
          height: 100,
          position: "absolute",
          bottom: -50,
          left: "50%",
          transform: "translateX(-50%)",
          border: "3px solid white",
          boxShadow: 3,
        }}
      />
    </Box>

    <Box sx={{ pt: 7, pb: 3, px: 2, textAlign: "center", flexGrow: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        {user?.fullname}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: "#666", fontSize: "0.9rem" }}>
          {user?.position}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <EmailIcon sx={{ fontSize: 16, mr: 0.5, color: "#666" }} />
        <Typography variant="body2" sx={{ color: "#666", fontSize: "0.9rem" }}>
          {user?.email}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <PhoneIcon sx={{ fontSize: 16, mr: 0.5, color: "#666" }} />
        <Typography variant="body2" sx={{ color: "#666", fontSize: "0.9rem" }}>
          {user?.phoneNumber}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

interface DeviceChartProps {
  completedDevices: Device[];
  fromDate: string;
  toDate: string;
}

const DeviceChart: React.FC<DeviceChartProps> = ({
  completedDevices,
  fromDate,
  toDate,
}) => {
  const filteredDevices = useMemo(() => {
    return completedDevices.filter((device) => {
      if (fromDate && device.date < fromDate) return false;
      if (toDate && device.date > toDate) return false;
      return true;
    });
  }, [completedDevices, fromDate, toDate]);

  const chartData = useMemo(() => {
    const dataMap: Record<string, number> = {};
    filteredDevices.forEach((device) => {
      dataMap[device.date] = (dataMap[device.date] || 0) + 1;
    });
    return Object.entries(dataMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredDevices]);

  const option: echarts.EChartsOption = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: chartData.map((item) => item.date),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      minInterval: 1,
    },
    series: [
      {
        data: chartData.map((item) => item.count),
        type: "line",
        smooth: true,
        lineStyle: { color: "#1976d2", width: 2 },
        itemStyle: { color: "#1976d2" },
      },
    ],
    grid: {
      top: "16px",
      bottom: "16px",
      left: "24px",
      right: "24px",
      containLabel: true,
    },
  };

  return (
    <Paper
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 5,
        height: "100%",
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
      >
        Theo dõi task
      </Typography>
      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
      />
    </Paper>
  );
};

interface Props {
  id?: string;
}

const UserDetailPage: React.FC<Props> = ({ id }) => {
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [fromDate, setFromDate] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (id) {
      userApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((response) => setUser(response));
    }
  }, [id]);

  return (
    <>
      {/* Bộ lọc ngày cho toàn bộ trang */}
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Typography color="primary" variant="subtitle1" fontWeight="bold">
          Chi tiết nhân viên
        </Typography>
        <TextField
          value={date}
          type="date"
          size="small"
          placeholder="Tìm kiếm"
          color="primary"
          onChange={(e) => setDate(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            "& .MuiInputBase-input": {
              fontSize: "12px", // font size nhỏ hơn
            },
          }}
          InputProps={{
            style: {
              borderRadius: "20px",
              fontSize: "12px", // đảm bảo font size ở input được đặt nhỏ
            },
          }}
        />
      </Box>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <EmployeeDetails user={user} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Wrapper
            title="Theo dõi công việc
          "
          >
            {/* <LineChartProduct
              params={{ ...getSevenDayRange(date), assigneeId: id }}
            /> */}
          </Wrapper>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8 }}>
          <Wrapper title="Danh sách task">
            {/* Truyền thêm filter ngày nếu TaskCheckList hỗ trợ */}
            <TaskCheckList
              param={{ ...getSevenDayRange(date), assigneeId: id }}
            />
          </Wrapper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Wrapper>
            <TaskCheckOverview
              param={{ ...getOneDayRange(date), assigneeId: id }}
            />
          </Wrapper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default UserDetailPage;
