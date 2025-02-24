import { ReactECharts } from "@components/ReactChart";
import OverviewUserTask from "@modules/user/components/user/OverviewUserTask";
import { Grid2, Paper, Typography } from "@mui/material";
import * as echarts from "echarts";

import overviewApi from "@modules/maintenance/apis/overviewApi";
import Wrapper from "../common/Wrapper";
import ProductWithoutTask from "../product/ProductWithoutTasks";
import TaskCheckOverview from "../taskCheck/components/TaskcheckOverview";

import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import { OverviewKeyMetricDto } from "@modules/maintenance/datas/overview/OverviewKeyMetricsDto";
import { useEffect, useState } from "react";

const MaintainedDevicesLineChart: React.FC = () => {
  const [keyMetric, setKeyMetric] = useState<OverviewKeyMetricDto>();
  useEffect(() => {
    overviewApi
      .getKeyMetric()
      .then(unwrapObjectReponse)
      .then((res) => setKeyMetric(res));
  }, []);
  // Dữ liệu metric

  // Dữ liệu và cấu hình biểu đồ đường (line chart)
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
    Grid2: {
      top: "16px",
      left: "16px",
      right: "16px",
      bottom: "16px",
      containLabel: true,
    },
  };

  // Dữ liệu và cấu hình biểu đồ tròn (pie chart) cho trạng thái các task
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

  // Danh sách các thiết bị chưa được tạo task
  const devicesWithoutTask = [
    "Thiết bị A",
    "Thiết bị B",
    "Thiết bị C",
    "Thiết bị D",
  ];

  // Danh sách các nhân viên cần thực hiện task
  const employeesWithTask = [
    "Nhân viên 1",
    "Nhân viên 2",
    "Nhân viên 3",
    "Nhân viên 4",
  ];

  // Định nghĩa style chung cho Paper (card)
  const cardPaperStyle = {
    p: 3,
    width: "100%",
    height: "100%",
    boxShadow: 3,
    borderRadius: 4,
  };

  return (
    <Grid2 container spacing={2}>
      {/* Block Metric */}

      <Grid2 size={12} container spacing={2} justifyContent={"center"}>
        <Grid2 size={{ md: 2, xs: 12 }}>
          <Paper sx={cardPaperStyle}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#555", fontWeight: 500 }}
            >
              Tổng số thiết bị
            </Typography>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold" }}>
              {keyMetric?.totalProduct}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ md: 2, xs: 12 }}>
          <Paper sx={cardPaperStyle}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#555", fontWeight: 500 }}
            >
              Tổng số nhân viên
            </Typography>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold" }}>
              {keyMetric?.totalUser}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ md: 2, xs: 12 }}>
          <Paper sx={cardPaperStyle}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#555", fontWeight: 500 }}
            >
              Tổng số khách hàng
            </Typography>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold" }}>
              {keyMetric?.totalCustomer}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ md: 2, xs: 12 }}>
          <Paper sx={cardPaperStyle}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#555", fontWeight: 500 }}
            >
              Tổng số task
            </Typography>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold" }}>
              {keyMetric?.totalTemplate}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ md: 2, xs: 12 }}>
          <Paper sx={cardPaperStyle}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#555", fontWeight: 500 }}
            >
              Số lượng RFID
            </Typography>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold" }}>
              {keyMetric?.totalRFID}
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Block Biểu đồ */}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Wrapper title="Bảo trì thiết bị">
          <ReactECharts
            option={lineOption}
            style={{ height: "300px", width: "100%" }}
          />
        </Wrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TaskCheckOverview />
      </Grid2>

      {/* Block Danh sách */}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Wrapper title="Danh sách thiết bị chưa được tạo task">
          <ProductWithoutTask />
        </Wrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Wrapper title="Danh sách nhân viên cần thực hiện task">
          <OverviewUserTask />
        </Wrapper>
      </Grid2>
    </Grid2>
  );
};

export default MaintainedDevicesLineChart;
