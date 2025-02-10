import { ReactECharts } from "@components/ReactChart";
import { EChartsOption } from "echarts";

const UntestedDevicesChart = () => {
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
          { value: 1048, name: "Đã kiểm tra" },
          { value: 735, name: "Chưa kiểm tra" },
        ],
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ width: "100%", height: "400px" }} />
  );
};

export default UntestedDevicesChart;
