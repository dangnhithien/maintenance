import { ReactECharts } from "@components/ReactChart";
import StyledDataGrid from "@components/StyledDataGrid";
import overviewApi from "@modules/maintenance/apis/overviewApi";
import {
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { OverviewKeyMetric } from "@modules/maintenance/datas/overview/OverviewKeyMetrics";
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

  // Subtract 7 days from the current date
  fromDate.setDate(toDate.getDate() - 7);

  return {
    fromDate,
    toDate,
  };
}

const Dashboard: React.FC = () => {
  const [params, setParams] = useState<GetTaskCheckDto>({
    includeProperties: "TemplateCheck,Product",
    takeCount: 50,
  });
  const [overViewProduct, setOverViewProduct] = useState<OverviewProductDto[]>(
    []
  );
  const [overViewKeyMetric, setOverViewKeyMetric] =
    useState<OverviewKeyMetric>();
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
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    // {
    //   field: "code",
    //   headerName: "Mã",
    //   editable: false,
    //   sortable: false,
    //   flex: 1,
    //   renderCell: (params: any) => (
    //     <Link to={`/task-check/detail/${params.row.id}`}>
    //       {params.row.code}
    //     </Link>
    //   ),
    // },

    // {
    //   field: "",
    //   headerName: "Tên biểu mẫu ",
    //   editable: false,
    //   sortable: false,
    //   flex: 1,
    //   renderCell: (params: any) => (
    //     <Link to={`/task-check/detail/${params.row.id}`}>
    //       {params.row.templateCheck?.name}
    //     </Link>
    //   ),
    // },
    {
      field: "checkTime",
      headerName: "Ngày tạo",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.checkTime &&
            new Date(params.row.checkTime).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
        </Link>
      ),
    },
    {
      field: "createdBy",
      headerName: "Người tạo",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "",
      headerName: "Thiết bị",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => <span>{params.row.product?.name}</span>,
    },
  ];
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
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Số lượng máy được kiểm tra",
        type: "bar",
        stack: "total", // Để chồng các cột lên nhau.
        data: overViewProduct.map((e) => e.totalChecked),
      },
      {
        name: "Số lượng máy gặp lỗi",
        type: "bar",
        stack: "total", // Để chồng các cột lên nhau
        data: overViewProduct.map((e) => e.totalErrors),
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow", // Hiển thị tooltip khi di chuột trên trục
      },
      formatter: function (params: any) {
        // Làm tròn các giá trị hiển thị trong tooltip
        return params
          .map((param: any) => {
            return `${param.seriesName}: ${param.value.toFixed(1)}`;
          })
          .join("<br/>");
      },
    },
    grid: {
      left: 16,
      top: 8,
      right: 16,
      bottom: 24,
    },
  };

  return (
    <Grid2 container size={12} spacing={1}>
      <Grid2 container spacing={1} size={8}>
        {/* Chart */}
        <Grid2 size={12}>
          <Wrapper title={"Theo dõi hoạt động kiểm tra "}>
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
              {/* <Stack  direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Stack>
              <Stack  direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Stack> */}
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
            <Wrapper title="Phiếu cần duyệt">
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
