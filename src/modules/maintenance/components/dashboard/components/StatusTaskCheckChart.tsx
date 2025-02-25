import { ReactECharts } from "@components/ReactChart";
import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import overviewApi from "@modules/maintenance/apis/overviewApi";
import { OverviewStatusTaskCheckDto } from "@modules/maintenance/datas/overview/OverviewStatusTaskCheckDto";
import { EChartsOption } from "echarts";
import { useEffect, useState } from "react";

const StatusTaskCheckChart = () => {
  const [data, setData] = useState<OverviewStatusTaskCheckDto>();
  useEffect(() => {
    overviewApi
      .getStatusTaskCheck({ fromDate: new Date(), toDate: new Date() })
      .then(unwrapObjectReponse)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        name: "Phiếu khảo sát",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        data: [
          {
            value: data?.totalTaskWaiting,
            name: "Chờ duyệt",
            itemStyle: { color: "#FFC107" }, // Màu cam
          },
          {
            value: data?.totalTaskApproved,
            name: "Đã duyệt",
            itemStyle: { color: "#4CAF50" }, // Màu xanh lá
          },
          {
            value: data?.totalTaskRejected,
            name: "Từ chối",
            itemStyle: { color: "#F44336" }, // Màu đỏ
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: "350px" }} />
  );
};

export default StatusTaskCheckChart;
