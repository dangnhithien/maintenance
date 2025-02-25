import { ReactECharts } from "@components/ReactChart";
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

  const lineChartLabels = [
    "2025-02-15",
    "2025-02-16",
    "2025-02-17",
    "2025-02-18",
    "2025-02-19",
    "2025-02-20",
    "2025-02-21",
  ];

  // Dữ liệu thực tế số thiết bị mà nhân viên đã làm
  const lineChartData = [3, 5, 2, 8, 4, 6, 7];

  // Dữ liệu hệ thống tạo ra yêu cầu bảo trì
  const lineChartSystemData = [4, 6, 3, 7, 5, 7, 8];

  // Tính toán sự chênh lệch giữa 2 dữ liệu
  const lineChartDifference = lineChartData.map(
    (value, index) => value - lineChartSystemData[index]
  );

  const lineOption: echarts.EChartsOption = {
    tooltip: { trigger: "axis" },
    legend: {
      data: [
        "Số thiết bị đã bảo trì",
        "Số thiết bị yêu cầu bảo trì",
        "Chênh lệch",
      ],
    },
    xAxis: { type: "category", data: lineChartLabels },
    yAxis: { type: "value" },

    series: [
      {
        name: "Số thiết bị đã bảo trì",
        type: "line",
        data: lineChartData,
        smooth: true,
      },
      {
        name: "Số thiết bị yêu cầu bảo trì",
        type: "line",
        data: lineChartSystemData,
        smooth: true,
        lineStyle: {
          type: "dashed", // Đường kẻ nét đứt
        },
      },
      {
        name: "Chênh lệch",
        type: "line",
        data: lineChartDifference,
        smooth: true,
        lineStyle: {
          type: "dotted", // Đường kẻ chấm để dễ phân biệt
        },
        itemStyle: {
          color: "red", // Màu đỏ để dễ nhìn thấy sự chênh lệch
        },
      },
    ],
    grid: {
      top: "32px",
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
  const data: any = [
    { name: "Nguyễn Văn A", assigned: 10, completed: 8 },
    { name: "Trần Thị B", assigned: 12, completed: 9 },
    { name: "Lê Văn C", assigned: 15, completed: 12 },
    { name: "Phạm Thị D", assigned: 9, completed: 7 },
    { name: "Hoàng Văn E", assigned: 14, completed: 10 },
  ];
  const barOption: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Công việc được giao", "Công việc đã hoàn thành"],
      top: 0,
    },
    xAxis: {
      type: "category",
      data: data.map((employee: any) => employee.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Công việc được giao",
        type: "bar",
        data: data.map((employee: any) => employee.assigned),
        barWidth: "30%", // Giảm chiều rộng của cột
        itemStyle: {
          color: "#749fdf", // Màu sáng hơn
        },
      },
      {
        name: "Công việc đã hoàn thành",
        type: "bar",
        data: data.map((employee: any) => employee.completed),
        barWidth: "30%", // Giảm chiều rộng của cột
        itemStyle: {
          color: "#aee8a1", // Màu sáng hơn
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
                  variant="caption"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số thiết bị trong hệ thống
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {keyMetric?.totalProduct}
                </Typography>
                <Typography
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                  mr={0.5}
                  fontSize={14}
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
                  variant="caption"
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
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                  mr={0.5}
                  fontSize={14}
                >
                  80
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  nhân viên có task trong hôm nay
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="caption"
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
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                  mr={0.5}
                  fontSize={14}
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
                  variant="caption"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số task
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {/* {keyMetric?.totalTemplate} */}50
                </Typography>
                <Typography
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                  mr={0.5}
                  fontSize={14}
                >
                  15
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  task đang chờ xử lý
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="caption"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số thiết bị cần bảo trì
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {/* {keyMetric?.totalTemplate} */} 50
                </Typography>
                <Typography
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                  mr={0.5}
                  fontSize={14}
                >
                  15
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  thiết bị đã được bảo trì
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} height="100%">
              <Paper sx={cardPaperStyle}>
                <Typography
                  variant="caption"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Tổng số task cần duyệt
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#333", fontWeight: "bold" }}
                >
                  {/* {keyMetric?.totalTemplate} */} 30
                </Typography>
                <Typography
                  variant="overline"
                  sx={{ mt: 2 }}
                  color="success"
                  fontWeight={"bold"}
                  mr={0.5}
                  fontSize={14}
                >
                  15
                </Typography>
                <Typography variant="caption" sx={{ color: "#888", mt: 1 }}>
                  task đã được duyệt
                </Typography>
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }} height={"100%"}>
          <Wrapper title="Theo dõi bảo trì thiết bị" sx={{ height: "100%" }}>
            <ReactECharts
              option={lineOption}
              style={{ height: "350px", width: "100%" }}
            />
          </Wrapper>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 12 }}>
        <Wrapper title="Theo dõi công việc bảo trì">
          <ReactECharts
            option={barOption}
            style={{ height: "300px", width: "100%" }}
          />
        </Wrapper>
      </Grid2>

      {/* Hàng 2: Danh sách và Pie Chart */}
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Wrapper title="Danh sách task cần duyệt">
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
      {/* <Grid2 size={12} container spacing={2}>
        <Grid2 size={12}>
          <Wrapper title="Danh sách nhân viên cần thực hiện task">
            <OverviewUserTask />
          </Wrapper>
        </Grid2>
      </Grid2> */}
    </Grid2>
  );
};

export default MaintainedDevicesLineChart;
