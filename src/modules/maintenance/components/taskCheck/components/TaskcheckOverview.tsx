import { ReactECharts } from "@components/ReactChart";
import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import taskCheckApi from "@modules/maintenance/apis/taskCheckApi";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import { Paper, Typography } from "@mui/material";
import * as echarts from "echarts";
import { useEffect, useState } from "react";

export interface OverviewTaskCheck {
  totalTaskCheck: number;
  totalTaskCreated: number;
  totalTaskDone: number;
  totalTaskNotAssigned: number;
  totalTaskLate: number;
}

interface Props {
  param?: GetTaskCheckDto;
}

const TaskCheckOverview: React.FC<Props> = ({ param }) => {
  const [data, setData] = useState<OverviewTaskCheck | null>(null);

  useEffect(() => {
    taskCheckApi
      .getOverviewTaskCheck(param)
      .then(unwrapObjectReponse)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [param]);

  // Chuyển đổi dữ liệu tổng quan thành mảng dữ liệu cho biểu đồ Pie
  const pieData = data
    ? [
        { name: "Tổng số Task", value: data.totalTaskCheck },
        { name: "Task đã tạo", value: data.totalTaskCreated },
        { name: "Task chưa được giao", value: data.totalTaskNotAssigned },
        { name: "Task trễ", value: data.totalTaskLate },
        { name: "Task đã hoàn thành", value: data.totalTaskDone },
      ]
    : [];

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },

    series: [
      {
        name: "Tình trạng Task",
        type: "pie",
        radius: "50%",

        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{b}: {c} ({d}%)",
        },
      },
    ],
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
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
      >
        Tình trạng Task
      </Typography>
      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
      />
    </Paper>
  );
};

export default TaskCheckOverview;
