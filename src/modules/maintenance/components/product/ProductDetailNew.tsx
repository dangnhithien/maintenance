import { unwrapError } from "@datas/comon/ApiResponse";
import productApi from "@modules/maintenance/apis/productApi";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { CircularProgress, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { EChartsOption } from "echarts";
import React, { useEffect, useState } from "react";
import InfoProduct from "../common/InfoProduct";
import { useNotification } from "../common/Notistack";
import Wrapper from "../common/Wrapper";
import ComponentCreateUpdate from "../component/ComponentCreateUpdate";
import TaskCheckList from "../taskCheck/TaskCheckList";

interface Props {
  id?: string;
}

const ProductDetailNew: React.FC<Props> = ({ id }) => {
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await productApi.getById(id, {
          includeProperties: "Device",
        });
        setProduct(res.result);
      } catch (err: any) {
        const { message } = unwrapError(err);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!product) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="error">
          Không tìm thấy sản phẩm.
        </Typography>
      </Paper>
    );
  }

  const lineChartLabels = [
    "2025-02-15",
    "2025-02-16",
    "2025-02-17",
    "2025-02-18",
    "2025-02-19",
    "2025-02-20",
    "2025-02-21",
  ];

  const lineChartData = [3, 5, 2, 8, 4, 6, 7];

  const option: EChartsOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: lineChartLabels },
    yAxis: { type: "value" },
    visualMap: {
      show: false,
      dimension: 0, // Sử dụng giá trị của trục x (chỉ số của category)
      pieces: [
        { gt: 0, lte: 4, color: "#6C63FF" }, // Các điểm từ chỉ số 3 đến 4 sẽ có màu xanh lá
        { gt: 4, color: "red" }, // Các điểm còn lại sẽ có màu xanh dương
      ],
    },
    series: [
      {
        name: "Số thiết bị bảo trì",
        type: "line",
        data: lineChartData,
        smooth: true,
        // Bỏ đi lineStyle.color để visualMap có thể áp dụng màu tự động
      },
    ],
    grid: {
      top: "16px",
      left: "16px",
      right: "16px",
      bottom: "16px",
      containLabel: true,
    },
  };

  return (
    <Grid2 container spacing={2} direction="row" sx={{ height: "100%" }}>
      {/* Cột bên trái: Thông tin sản phẩm */}
      <Grid2 sx={{ display: "flex" }}>
        <InfoProduct product={product} />
      </Grid2>

      {/* Cột bên phải: Nội dung chính */}
      <Grid2
        container
        direction="column"
        gap={1}
        flex={1}
        sx={{ display: "flex" }}
        spacing={2}
      >
        {/* <Grid2 size={{ xs: 12, md: 12 }}>
          <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 4, height: "100%" }}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Theo dõi bảo trì
            </Typography>
            <ReactECharts option={option} style={{ height: "300px" }} />
          </Paper>
        </Grid2> */}
        <Grid2 container size={{ xs: 12, md: 12 }}>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <Wrapper
              title="Danh sách task"
              sx={{ width: "100%", height: "100%" }}
            >
              <TaskCheckList param={{ productId: id }} />
            </Wrapper>
          </Grid2>
          <Grid2 size={12} minHeight={450}>
            <Wrapper title="Danh sách linh kiện">
              <ComponentCreateUpdate productId={id} isEdit={false} />
            </Wrapper>
          </Grid2>
          {/* <Grid2 size={{ xs: 12, md: 4 }}>
            <Wrapper
              title="Danh sách linh kiện đã thay thế"
              sx={{ width: "100%", height: "100%" }}
            >
              <Typography
                variant="body1"
                textAlign={"center"}
                mt={16}
                color="text.secondary"
              >
                Chưa có dữ liệu
              </Typography>
            </Wrapper>
          </Grid2> */}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default ProductDetailNew;
