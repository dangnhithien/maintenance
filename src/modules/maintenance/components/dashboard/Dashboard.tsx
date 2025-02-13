import { ReactECharts } from "@components/ReactChart";
import StyledDataGrid from "@components/StyledDataGrid";
import overviewApi from "@modules/maintenance/apis/overviewApi";
import {
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { OverviewKeyMetricDto } from "@modules/maintenance/datas/overview/OverviewKeyMetricsDto";
import { OverviewProductDto } from "@modules/maintenance/datas/overview/OverviewProductDto";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Grid2, Paper, Typography } from "@mui/material";
import { Stack, styled } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { EChartsOption } from "echarts";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import StatusTaskCheckChart from "./components/StatusTaskCheckChart";
import UntestedDevicesChart from "./components/UntestedDevicesChart";

// Tạo component Paper được style để dùng cho các block
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

function getDateRange(): { fromDate: Date; toDate: Date } {
  const toDate = new Date();
  const fromDate = new Date();
  // Trừ 7 ngày kể từ ngày hiện tại
  fromDate.setDate(toDate.getDate() - 7);
  return { fromDate, toDate };
}

const Dashboard: React.FC = () => {
  const [params, setParams] = useState<GetTaskCheckDto>({
    includeProperties: "TemplateCheck,Product",
    takeCount: 24,
    sortBy: "CreatedDate DESC",
  });
  const [overViewProduct, setOverViewProduct] = useState<OverviewProductDto[]>(
    []
  );
  const [overViewKeyMetric, setOverViewKeyMetric] =
    useState<OverviewKeyMetricDto>();
  const { taskChecks } = useTaskCheck(params);

  useEffect(() => {
    overviewApi
      .get(getDateRange())
      .then(unwrapListReponse)
      .then((data) => {
        setOverViewProduct(data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    overviewApi
      .getKeyMetric()
      .then(unwrapObjectReponse)
      .then((data) => {
        setOverViewKeyMetric(data);
      })
      .catch((error) => {});
  }, []);

  const columns: GridColDef[] = [
    {
      field: "checkTime",
      headerName: "Ngày tạo",
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.checkTime &&
            new Date(params.row.checkTime).toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              // second: "2-digit", // Bỏ comment nếu muốn hiển thị giây
            })}
        </Link>
      ),
    },
    {
      field: "createdBy",
      headerName: "Người tạo",
      editable: false,
      align: "center",
      headerAlign: "center",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <span>
          {params.row.createdBy || params.row.createdBy == "undifined"
            ? "Admin"
            : params.row.createdBy}
        </span>
      ),
    },
    {
      field: "",
      headerName: "Thiết bị",
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params: any) => <span>{params.row.product?.name}</span>,
    },
  ];

  // Cập nhật option biểu đồ: thêm một yAxis thứ hai và series line hiển thị tỉ lệ lỗi
  const option: EChartsOption = {
    xAxis: {
      type: "category",
      data: overViewProduct.map((e) =>
        new Date(e.checkedDate).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      ),
    },
    yAxis: [
      {
        type: "value",
        name: "Số lượng",
      },
      {
        type: "value",
        name: "Tỉ lệ lỗi (%)",
        min: 0,
        max: 100,
        position: "right",
        axisLabel: {
          formatter: "{value} %",
        },
      },
    ],
    series: [
      {
        name: "Số lượng máy được kiểm tra",
        type: "bar",
        stack: "total", // chồng các cột lên nhau
        data: overViewProduct.map((e) => e.totalChecked),
        itemStyle: { color: "#2196F3" }, // Màu xanh dương
      },
      {
        name: "Số lượng máy gặp lỗi",
        type: "bar",
        stack: "total", // chồng các cột lên nhau
        data: overViewProduct.map((e) => e.totalErrors),
        itemStyle: { color: "#F44336" }, // Màu đỏ
      },
      {
        name: "Tỉ lệ lỗi (%)",
        type: "line",
        yAxisIndex: 1, // dùng trục thứ 2
        data: overViewProduct.map((e) =>
          e.totalChecked
            ? +((e.totalErrors / e.totalChecked) * 100).toFixed(1)
            : 0
        ),
        itemStyle: { color: "#F44336" },
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow", // hiển thị tooltip theo dạng shadow
      },
      formatter: function (params: any) {
        return params
          .map((param: any) => {
            if (param.seriesName === "Tỉ lệ lỗi (%)") {
              return `${param.seriesName}: ${param.value}%`;
            }
            return `${param.seriesName}: ${param.value}`;
          })
          .join("<br/>");
      },
    },
    grid: {
      left: 36,
      top: 8,
      right: 50,
      bottom: 24,
    },
  };

  return (
    <Grid2 container size={12} spacing={1}>
      <Grid2 container spacing={1} size={8}>
        {/* Biểu đồ */}
        <Grid2 size={12}>
          <Wrapper title={"Bảo trì thiết bị"}>
            <ReactECharts
              option={option}
              style={{ height: 200, width: "100%" }}
            />
          </Wrapper>
        </Grid2>

        <Grid2 container spacing={1} size={12}>
          <Paper sx={{ p: 2, width: "100%" }}>
            <Grid2
              container
              spacing={2}
              size={12}
              justifyContent={"space-around"}
            >
              <Stack direction={"column"} justifyContent={"center"}>
                <Typography
                  variant="h5"
                  color="primary"
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {overViewKeyMetric?.totalProduct}
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  variant="h5"
                  color="primary"
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {overViewKeyMetric?.totalUser}
                </Typography>
                <Typography variant="caption">Nhân viên</Typography>
              </Stack>
              <Stack direction={"column"} justifyContent={"center"}>
                <Typography
                  variant="h5"
                  color="primary"
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {overViewKeyMetric?.totalTemplate}
                </Typography>
                <Typography variant="caption">Biểu mẫu</Typography>
              </Stack>
            </Grid2>
          </Paper>
        </Grid2>

        <Grid2 container spacing={1} size={12}>
          <Grid2 container direction={"column"} size={6}>
            <Wrapper title="Thiết bị ">
              <UntestedDevicesChart />
            </Wrapper>
          </Grid2>

          <Grid2 container direction={"column"} size={6}>
            <Wrapper title="Phiếu khảo sát">
              <StatusTaskCheckChart />
            </Wrapper>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 container size={4}>
        <Grid2 size={12} height={"100%"}>
          <Wrapper title="Lịch sử quét trong ngày">
            <StyledDataGrid rows={taskChecks} columns={columns} hideFooter />
          </Wrapper>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
