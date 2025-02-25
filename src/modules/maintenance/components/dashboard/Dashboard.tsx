import { ReactECharts } from "@components/ReactChart";
import OverviewUserTask from "@modules/user/components/user/OverviewUserTask";
import { Grid2, Paper, TextField, Typography } from "@mui/material";
import * as echarts from "echarts";

import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import overviewApi from "@modules/maintenance/apis/overviewApi";
import { OverviewKeyMetricDto } from "@modules/maintenance/datas/overview/OverviewKeyMetricsDto";
import { useEffect, useState } from "react";
import Wrapper from "../common/Wrapper";
import ProductWithoutTask from "../product/ProductWithoutTasks";

const MaintainedDevicesLineChart: React.FC = () => {
  const [keyMetric, setKeyMetric] = useState<OverviewKeyMetricDto>();
  useEffect(() => {
    overviewApi
      .getKeyMetric()
      .then(unwrapObjectReponse)
      .then((res) => setKeyMetric(res));
  }, []);

  // Dữ liệu cho biểu đồ đường
  const lineChartLabels = [
    "2025-02-15",
    "2025-02-16",
    "2025-02-17",
    "2025-02-18",
    "2025-02-19",
    "2025-02-20",
    "2025-02-21",
  ];
  const lineChartData = [3, 5, 2, 8, 4, 6, 7];

  const lineOption: echarts.EChartsOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: lineChartLabels },
    yAxis: { type: "value" },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        { gt: 0, lte: 4, color: "#6C63FF" },
        { gt: 4, color: "red" },
      ],
    },
    series: [
      {
        name: "Số thiết bị bảo trì",
        type: "line",
        data: lineChartData,
        smooth: true,
      },
    ],
    grid: {
      top: "16px",
      left: "16px",
      right: "16px",
      bottom: "16px",
      containLabel: true,
    },
  };

  // Dữ liệu cho biểu đồ tròn (pie chart)
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

  // Style dùng chung cho Paper (card)
  const cardPaperStyle = {
    p: 3,
    width: "100%",
    height: "100%",
    boxShadow: 3,
    borderRadius: 4,
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 container size={12} mb={1}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Tổng quan
        </Typography>
        <TextField
          type="date"
          size="small"
          placeholder="Tìm kiếm"
          color="primary"
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
      </Grid2>
      {/* Hàng 1: Metric và Line Chart */}
      <Grid2 container size={12} spacing={2} alignItems="center">
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Grid2
            container
            spacing={2}
            justifyContent="space-between"
            height="100%"
          >
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số thiết bị
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {keyMetric?.totalProduct}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                >
                  120
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  thiết bị đã gắn RFID
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số nhân viên
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {keyMetric?.totalUser}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                >
                  80
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  nhân viên đang trực ca
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số khách hàng
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {keyMetric?.totalCustomer}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                >
                  100
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  khách hàng cần bảo trì hôm nay
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số task
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {keyMetric?.totalTemplate}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                >
                  15
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  task đang chờ xử lý
                </Typography>
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Wrapper title="Bảo trì thiết bị">
            <ReactECharts
              option={lineOption}
              style={{ height: "250px", width: "100%" }}
            />
          </Wrapper>
        </Grid2>
      </Grid2>

      {/* Hàng 2: Danh sách và Pie Chart */}
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Wrapper title="Danh sách thiết bị chưa được tạo task">
            <ProductWithoutTask />
          </Wrapper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Wrapper title="Trạng thái task">
            <ReactECharts
              option={pieOption}
              style={{ height: "300px", width: "100%" }}
            />
          </Wrapper>
        </Grid2>
      </Grid2>
      {/* Hàng 3: Danh sách và Pie Chart */}
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={12}>
          <Wrapper title="Danh sách nhân viên cần thực hiện task">
            <OverviewUserTask />
          </Wrapper>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MaintainedDevicesLineChart;
