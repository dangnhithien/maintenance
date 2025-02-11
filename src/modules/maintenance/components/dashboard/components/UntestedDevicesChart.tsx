import { ReactECharts } from "@components/ReactChart";
import overviewApi from "@modules/maintenance/apis/overviewApi";
import { unwrapObjectReponse } from "@modules/maintenance/datas/comon/ApiResponse";
import { OverviewStatusCheckProductDto } from "@modules/maintenance/datas/overview/OverviewStatusCheckProductDto";
import { EChartsOption } from "echarts";
import { useEffect, useState } from "react";

const UntestedDevicesChart = () => {
  const [data, setData] = useState<OverviewStatusCheckProductDto>();
  useEffect(() => {
    overviewApi
      .getStatusProduct()
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
        name: "Danh sách thiết bị",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        data: [
          {
            value: data?.totalCheckedProduct,
            name: "Đã kiểm tra",
            itemStyle: { color: "#4CAF50" }, // Màu xanh lá
          },
          {
            value: data?.totalUnCheckedProduct,
            name: "Chưa kiểm tra",
            itemStyle: { color: "#9E9E9E" }, // Màu xám
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: "350px" }} />
  );
};

export default UntestedDevicesChart;
