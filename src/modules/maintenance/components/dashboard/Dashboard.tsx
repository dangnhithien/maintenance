import { ReactECharts } from "@components/ReactChart";
import { Grid2, Paper, TextField, Typography } from "@mui/material";
import * as echarts from "echarts";

import {
  unwrapListReponse,
  unwrapObjectReponse,
} from "@datas/comon/ApiResponse";
import overviewApi from "@modules/maintenance/apis/overviewApi";
import productApi from "@modules/maintenance/apis/productApi";
import { OverviewKeyMetricDto } from "@modules/maintenance/datas/overview/OverviewKeyMetricsDto";
import { OverviewProductByDate } from "@modules/maintenance/datas/overview/OverViewProductByDate";
import userApi from "@modules/user/apis/UserApi";
import { OverviewUser } from "@modules/user/datas/user/OverviewUser";
import { useEffect, useMemo, useState } from "react";
import Approval from "../approval/Approval";
import Wrapper from "../common/Wrapper";
import TaskCheckOverview from "../taskCheck/components/TaskcheckOverview";
import LineChartProduct from "./components/LineChartProduct";

// Hàm tạo khoảng thời gian 7 ngày (3 ngày trước và 3 ngày sau ngày được chọn)
function getSevenDayRange(inputDate: string): { fromDate: Date; toDate: Date } {
  const date = new Date(inputDate);
  const fromDate = new Date(date);
  fromDate.setDate(date.getDate() - 3);
  const toDate = new Date(date);
  toDate.setDate(date.getDate() + 3);
  return { fromDate, toDate };
}

// Hàm tạo khoảng thời gian 1 ngày (từ ngày được chọn đến ngày kế tiếp)
function getOneDayRange(dateStr: string): { fromDate: Date; toDate: Date } {
  const fromDate = new Date(dateStr);
  const toDate = new Date(fromDate);
  toDate.setDate(fromDate.getDate() + 1);
  return { fromDate, toDate };
}

const MaintainedDevicesLineChart: React.FC = () => {
  const [keyMetric, setKeyMetric] = useState<OverviewKeyMetricDto>();
  const [productData, setProductData] = useState<OverviewProductByDate[]>([]);
  const [userListTask, setUserListTask] = useState<OverviewUser[]>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Lấy số liệu key metrics cho ngày được chọn
  useEffect(() => {
    const selectedDate = new Date(date);
    overviewApi
      .getKeyMetric({ fromDate: selectedDate, toDate: selectedDate })
      .then(unwrapObjectReponse)
      .then(setKeyMetric);
  }, [date]);

  // Lấy danh sách task của người dùng cho khoảng 1 ngày
  useEffect(() => {
    const { fromDate, toDate } = getOneDayRange(date);
    userApi
      .getOverviewUserTask({ fromDate, toDate })
      .then(unwrapListReponse)
      .then(setUserListTask);
  }, [date]);

  // Lấy dữ liệu sản phẩm cho khoảng 7 ngày (trung tâm theo ngày được chọn)
  useEffect(() => {
    const { fromDate, toDate } = getSevenDayRange(date);
    productApi
      .getOverviewProductByDate({ fromDate, toDate })
      .then(unwrapListReponse)
      .then((res) => setProductData(res as OverviewProductByDate[]));
  }, [date]);

  const lineChartLabels = productData.map((item) =>
    new Date(item.date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  );

  const lineChartData = productData.map(
    (item) => item.totalProductMaintenanced
  );
  const lineChartSystemData = productData.map(
    (item) => item.totalProductNeedToMaintenance
  );
  const lineChartDifference = productData.map(
    (item) => item.totalProductMaintenanced - item.totalProductNeedToMaintenance
  );

  const lineOption: echarts.EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      legend: {},
      xAxis: { type: "category", data: lineChartLabels },
      yAxis: { type: "value", interval: 1 },
      series: [
        {
          name: "Số thiết bị đã bảo trì",
          type: "line",
          data: lineChartData,
          smooth: true,
          itemStyle: {
            color: "#aee8a1",
          },
        },
        {
          name: "Số thiết bị cần bảo trì",
          type: "line",
          data: lineChartSystemData,
          smooth: true,
          itemStyle: {
            color: "#749fdf",
          },
        },
        {
          name: "Chưa hoàn thành",
          type: "line",
          data: lineChartDifference,
          smooth: true,
          lineStyle: { type: "dotted" },
          itemStyle: { color: "red" },
        },
      ],
      grid: {
        top: "32px",
        left: "16px",
        right: "16px",
        bottom: "16px",
        containLabel: true,
      },
    }),
    [lineChartLabels, lineChartData, lineChartSystemData, lineChartDifference]
  );

  // Dữ liệu cho pie chart (nếu cần sử dụng trong tương lai)
  const taskStatusData = [
    { value: 40, name: "Đã hoàn thành" },
    { value: 25, name: "Đang tiến hành" },
    { value: 35, name: "Chưa bắt đầu" },
  ];

  const pieOption: echarts.EChartsOption = {
    tooltip: { trigger: "item" },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Trạng thái task",
        type: "pie",
        radius: "50%",
        data: taskStatusData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const barOption: echarts.EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Task được giao", "Task đã hoàn thành"],
        top: 0,
      },
      xAxis: {
        type: "category",
        data: userListTask.map((employee) => employee.assigneeName),
      },
      yAxis: {
        type: "value",
        interval: 1,
      },
      series: [
        {
          name: "Task được giao",
          type: "bar",
          data: userListTask.map((employee) => employee.totalTask),
          barWidth: "30%",
          itemStyle: {
            color: "#749fdf",
          },
        },
        {
          name: "Task đã hoàn thành",
          type: "bar",
          data: userListTask.map((employee) => employee.totalTaskDone),
          barWidth: "30%",
          itemStyle: {
            color: "#aee8a1",
          },
        },
      ],
      grid: {
        top: "40px",
        left: "16px",
        right: "16px",
        bottom: "16px",
        containLabel: true,
      },
    }),
    [userListTask]
  );

  const cardPaperStyle = {
    p: 3,
    width: "100%",
    height: "100%",
    boxShadow: 3,
    borderRadius: 4,
  };

  const metrics = [
    {
      title: "Tổng số thiết bị trong hệ thống",
      value: keyMetric?.totalProduct,
      subValue: keyMetric?.totalRFID,
      subText: "thiết bị đã gắn RFID",
    },
    {
      title: "Thiết bị cần bảo trì hôm nay",
      value: keyMetric?.totalProductNeedToMaintenanceToday,
      subValue: keyMetric?.totalProductMaintenancedToday,
      subText: "thiết bị đã được bảo trì",
    },
    {
      title: "Tổng số khách hàng",
      value: keyMetric?.totalCustomer,
      subValue: keyMetric?.totalCustomerNeedMaintenanceToday,
      subText: "khách hàng cần bảo trì hôm nay",
    },
    {
      title: "Tổng số task kiểm tra hôm nay",
      value: keyMetric?.totalTaskCheckToday,
      subValue: keyMetric?.totalTaskCheckDoneToday,
      subText: "task đã hoàn thành",
    },
    {
      title: "Tổng số nhân viên",
      value: keyMetric?.totalUser,
      subValue: keyMetric?.totalUserHaveTask,
      subText: "nhân viên có task hôm nay",
    },
    {
      title: "Task cần duyệt hôm nay",
      value: keyMetric?.totalTaskCheckNeedToApproveToday,
      subValue: keyMetric?.totalTaskCheckApprovedToday,
      subText: "task đã được duyệt",
    },
  ];

  return (
    <Grid2 container spacing={2}>
      <Grid2 container size={12} mb={1}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Tổng quan
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
              fontSize: "12px",
            },
          }}
          InputProps={{
            style: {
              borderRadius: "20px",
              fontSize: "12px",
            },
          }}
        />
      </Grid2>

      {/* Hàng 1: Metrics và Line Chart */}
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={4} container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid2 key={index} size={6}>
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="caption"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  {metric.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {metric.value || 0}
                </Typography>
                <Typography
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight="bold"
                  mr={0.5}
                  fontSize={14}
                >
                  {metric.subValue || 0}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  {metric.subText}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
        <Grid2 size={8} sx={{ height: "100%" }}>
          <Wrapper title="Theo dõi bảo trì thiết bị" sx={{ height: "100%" }}>
            <LineChartProduct params={getSevenDayRange(date)} />
          </Wrapper>
        </Grid2>
      </Grid2>

      {/* Hàng 2: Biểu đồ cột theo dõi task */}
      <Grid2 size={12}>
        <Wrapper title="Theo dõi công việc bảo trì">
          <ReactECharts
            option={barOption}
            style={{ height: "300px", width: "100%" }}
          />
        </Wrapper>
      </Grid2>

      {/* Hàng 3: Danh sách task cần duyệt và Task Check Overview */}
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={8}>
          <Wrapper title="Danh sách task cần duyệt">
            <Approval />
          </Wrapper>
        </Grid2>
        <Grid2 size={4}>
          <TaskCheckOverview param={getOneDayRange(date)} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MaintainedDevicesLineChart;
