import { ReactECharts } from "@components/ReactChart";
import StyledDataGrid from "@components/StyledDataGrid";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Grid2, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { EChartsOption } from "echarts";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import UntestedDevicesList from "./components/UntestedDevicesList";
import WaitingTaskList from "./components/WaitingTaskList";

// Tạo component Paper được style để dùng cho các block
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const Dashboard: React.FC = () => {
  const [params, setParams] = useState<GetTaskCheckDto>({
    includeProperties: "TemplateCheck",
    takeCount: 50,
  });
  const {
    taskChecks,
    deleteTaskCheck,
    restoreTaskCheck,
    error,
    loading,
    totalCount,
  } = useTaskCheck(params);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },

    {
      field: "",
      headerName: "Tên biểu mẫu ",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.templateCheck?.name}
        </Link>
      ),
    },
    {
      field: "checkTime",
      headerName: "Thời gian ",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Người tạo",
      editable: false,
      sortable: false,
      flex: 1,
    },
  ];
  const option: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  return (
    <Grid2 container size={12} spacing={1}>
      <Grid2 container spacing={1} size={8}>
        {/* Chart */}
        <Grid2 size={12}>
          <Wrapper title={"Số lượng lỗi theo thiết bị"}>
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
              <Grid2 container direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Grid2>
              <Grid2 container direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Grid2>
              <Grid2 container direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Grid2>
              <Grid2 container direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Grid2>
              <Grid2 container direction={"column"}>
                <Typography variant="h5" color="primary">
                  50
                </Typography>
                <Typography variant="caption">Thiết bị</Typography>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>

        <Grid2 container spacing={1} size={12}>
          <Grid2 container direction={"column"} size={6}>
            <Wrapper title="Thiết bị chưa được kiểm tra">
              <UntestedDevicesList />
            </Wrapper>
          </Grid2>

          <Grid2 container direction={"column"} size={6}>
            <Wrapper title="Phiếu cần duyệt">
              <WaitingTaskList />
            </Wrapper>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 container size={4}>
        <Grid2 size={12} height={"100%"}>
          <Wrapper title="Lịch sử quét trong ngày">
            <StyledDataGrid rows={taskChecks} columns={columns} />
          </Wrapper>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
