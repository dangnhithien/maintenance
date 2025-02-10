import { ReactECharts } from "@components/ReactChart";
import { EChartsOption } from "echarts";

const StatusTaskCheckChart = () => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Danh sách thiết bị",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },

        data: [
          { value: 1048, name: "Đã tạo" },
          { value: 735, name: "Chờ duyệt" },
          { value: 1048, name: "Đã duyệt" },
          { value: 735, name: "Từ chối" },
        ],
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ width: "100%", height: "400px" }} />
  );
};

export default StatusTaskCheckChart;
