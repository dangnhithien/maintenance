import { ReactECharts } from "@components/ReactChart";
import { ApiRequest } from "@datas/comon/ApiRequest";
import { unwrapListReponse } from "@datas/comon/ApiResponse";
import productApi from "@modules/maintenance/apis/productApi";
import { OverviewProductByDate } from "@modules/maintenance/datas/overview/OverViewProductByDate";
import React, { useEffect, useMemo, useState } from "react";
interface Props {
  params: ApiRequest;
}
const LineChartProduct: React.FC<Props> = ({ params }) => {
  const [productData, setProductData] = useState<OverviewProductByDate[]>([]);
  useEffect(() => {
    productApi
      .getOverviewProductByDate({
        fromDate: params.fromDate,
        toDate: params.toDate,
        assigneeId: params.assigneeId,
      })
      .then(unwrapListReponse)
      .then((res) => {
        setProductData(res as OverviewProductByDate[]);
      });
  }, [params]);
  const lineChartLabels = productData?.map((item) =>
    new Date(item.date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  );

  const lineChartData = productData?.map(
    (item) => item.totalProductMaintenanced
  );

  const lineChartSystemData = productData?.map(
    (item) => item.totalProductNeedToMaintenance
  );

  const lineChartDifference = productData?.map(
    (item) => item.totalProductMaintenanced - item.totalProductNeedToMaintenance
  );

  const lineOption: echarts.EChartsOption = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      legend: {},
      xAxis: { type: "category", data: lineChartLabels },
      yAxis: { type: "value" },
      series: [
        {
          name: "Số thiết bị đã bảo trì",
          type: "line",
          data: lineChartData,
          smooth: true,
          itemStyle: {
            color: "#aee8a1", // Màu sáng hơn
          },
        },
        {
          name: "Số thiết bị cần bảo trì",
          type: "line",
          data: lineChartSystemData,
          smooth: true,
          itemStyle: {
            color: "#749fdf", // Màu sáng hơn
          },
        },
        {
          name: "Chưa hoàn thành",
          type: "line",
          data: lineChartDifference,
          smooth: true,
          lineStyle: { type: "dotted" },
          itemStyle: { color: "red" },
        },
      ],
      grid: {
        top: "32px",
        left: "16px",
        right: "16px",
        bottom: "16px",
        containLabel: true,
      },
    }),

    [productData]
  );
  return (
    <ReactECharts
      option={lineOption}
      style={{ height: "350px", width: "100%" }}
    />
  );
};

export default LineChartProduct;
