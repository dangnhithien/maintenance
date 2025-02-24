import { ReactECharts } from "@components/ReactChart";
import { unwrapError } from "@datas/comon/ApiResponse";
import customerApi from "@modules/maintenance/apis/customerApi";
import { CustomerDto } from "@modules/maintenance/datas/customer/CustomerDto";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { EChartsOption } from "echarts";
import { useEffect, useState } from "react";
import Wrapper from "../common/Wrapper";
import MaintenanceReminder from "../product/MaintenanceReminder";
import ProductList from "../product/ProductList";
import TaskCheckList from "../taskCheck/TaskCheckList";

interface Props {
  id?: string;
}

const CustomerDetail: React.FC<Props> = ({ id }) => {
  const [customer, setCustomer] = useState<CustomerDto | null>(null);

  // Dữ liệu ban đầu cho biểu đồ
  const initialLabels = [
    "2025-02-15",
    "2025-02-16",
    "2025-02-17",
    "2025-02-18",
    "2025-02-19",
    "2025-02-20",
    "2025-02-21",
  ];
  const initialData = [3, 5, 2, 8, 4, 6, 7];

  // States cho bộ lọc biểu đồ
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [chartOption, setChartOption] = useState<EChartsOption>({
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: initialLabels },
    yAxis: { type: "value" },
    series: [
      {
        name: "Số thiết bị bảo trì",
        type: "line",
        data: initialData,
        smooth: true,
        lineStyle: { color: "#6C63FF" },
      },
    ],
    grid: {
      top: "16px",
      left: "16px",
      right: "16px",
      bottom: "16px",
      containLabel: true,
    },
  });

  // Hàm áp dụng filter cho biểu đồ
  const applyFilter = () => {
    if (!fromDate || !toDate) {
      // Nếu không chọn filter thì hiển thị đầy đủ dữ liệu
      setChartOption({
        ...chartOption,
        xAxis: { type: "category", data: initialLabels },
        series: [
          {
            name: "Số thiết bị bảo trì",
            type: "line",
            data: initialData,
            smooth: true,
            lineStyle: { color: "#6C63FF" },
          },
        ],
        title: undefined,
      });
      return;
    }
    const from = new Date(fromDate);
    const to = new Date(toDate);
    // Lọc dữ liệu theo khoảng ngày được chọn
    const filteredLabels: string[] = [];
    const filteredData: number[] = [];
    initialLabels.forEach((date, index) => {
      const current = new Date(date);
      if (current >= from && current <= to) {
        filteredLabels.push(date);
        filteredData.push(initialData[index]);
      }
    });
    setChartOption({
      ...chartOption,
      title: { text: `Bảo trì từ ${fromDate} đến ${toDate}` },
      xAxis: { type: "category", data: filteredLabels },
      series: [
        {
          name: "Số thiết bị bảo trì",
          type: "line",
          data: filteredData,
          smooth: true,
          lineStyle: { color: "#6C63FF" },
        },
      ],
    });
  };

  // Các dữ liệu mẫu khác (timeline, lịch sử, thiết bị,...)
  const maintenanceHistory = [
    { id: 1, date: "2025-02-15", description: "Bảo trì thiết bị X" },
    { id: 2, date: "2025-02-16", description: "Bảo trì thiết bị Y" },
    { id: 3, date: "2025-02-17", description: "Bảo trì thiết bị Z" },
  ];

  const upcomingMaintenance = [
    { id: 1, date: "2025-03-01", device: "Thiết bị A" },
    { id: 2, date: "2025-03-05", device: "Thiết bị B" },
    { id: 3, date: "2025-03-10", device: "Thiết bị C" },
  ];

  const devices = [
    { id: 1, name: "Máy in LaserJet", type: "Printer", status: "Active" },
    {
      id: 2,
      name: "Laptop Dell",
      type: "Computer",
      status: "Under Maintenance",
    },
    { id: 3, name: "Điện thoại iPhone", type: "Mobile", status: "Active" },
  ];

  const replacementItems = [
    {
      id: 1,
      name: "Pin",
      replacedDate: "2025-01-15",
      description: "Thay mới do hao mòn",
    },
    {
      id: 2,
      name: "Màn hình",
      replacedDate: "2025-02-10",
      description: "Thay thế do hỏng",
    },
  ];

  // Dữ liệu cho timeline (sử dụng upcomingMaintenance)
  const timelineData = upcomingMaintenance.map((item) => ({
    device: item.device,
    date: item.date,
  }));

  const timelineOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        const data = params[0].data;
        return `${data[1]}: ${new Date(data[0]).toLocaleDateString()}`;
      },
    },
    xAxis: {
      type: "time",
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: timelineData.map((item) => item.device),
      axisLabel: {
        formatter: (value: string) => value,
      },
    },
    series: [
      {
        type: "scatter",
        symbolSize: 20,
        data: timelineData.map((item) => [item.date, item.device]),
        itemStyle: { color: "#6C63FF" },
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
  };

  useEffect(() => {
    if (id) {
      customerApi
        .getById(id)
        .then((res) => {
          console.log("avc", res);
          setCustomer(res.result);
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          console.error(message);
        });
    }
  }, [id]);

  return (
    <Box sx={{ p: 1, minHeight: "100vh" }}>
      {/* Hàng 1: Thông tin khách hàng và biểu đồ số lượng thiết bị bảo trì */}
      <Grid2 container spacing={2} alignItems="stretch">
        {/* Customer Info Card */}
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Paper
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 5,
              height: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              transition: "0.3s",
              ":hover": { transform: "scale(1.02)" },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #6C63FF, #3F3D56)",
                height: 140,
                position: "relative",
              }}
            >
              <Avatar
                src="https://png.pngtree.com/png-clipart/20190617/original/pngtree-cartoon-wind-city-office-building-urban-high-rise-building-city-building-png-image_3855635.jpg"
                sx={{
                  width: 90,
                  height: 90,
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "3px solid white",
                  boxShadow: 3,
                }}
              />
            </Box>
            <Box sx={{ mt: 7, px: 3, pb: 3, flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {customer?.name}
              </Typography>
              {[
                { icon: <EmailIcon />, value: customer?.code },
                { icon: <PhoneIcon />, value: customer?.description },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  {item.icon}
                  <Typography variant="body2" sx={{ ml: 1, color: "#666" }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid2>

        {/* Maintenance Chart with Filter */}
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 4, height: "100%" }}>
            <Grid2 container justifyContent={"space-between"} direction={"row"}>
              <Grid2>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", color: "#3F3D56" }}
                >
                  Biểu đồ số lượng thiết bị bảo trì
                </Typography>
              </Grid2>
              {/* Bộ lọc từ ngày - đến ngày */}
              <Grid2 container spacing={2} sx={{ mb: 2 }}>
                <Grid2>
                  <TextField
                    label="Từ ngày"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                  />
                </Grid2>
                <Grid2>
                  <TextField
                    label="Đến ngày"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                  />
                </Grid2>
              </Grid2>
            </Grid2>
            <ReactECharts option={chartOption} style={{ height: "350px" }} />
          </Paper>
        </Grid2>
      </Grid2>

      {/* Hàng 2: Timeline bảo trì sắp tới với style cải tiến */}
      {/* <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <Paper
            sx={{
              p: 3,
              mb: 2,
              borderRadius: 4,
              boxShadow: 3,
              border: "1px solid #e0e0e0",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#3F3D56" }}
            >
              Timeline bảo trì sắp tới
            </Typography>
            <ReactECharts option={timelineOption} style={{ height: "300px" }} />
          </Paper>
        </Grid2>
      </Grid2> */}

      {/* Hàng 3: Lịch sử bảo trì & Thiết bị cần bảo trì */}
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Wrapper title="Lịch sử bảo trì">
            <TaskCheckList param={{ customerId: id }} />
          </Wrapper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Wrapper title="Thiết bị cần bảo trì">
            <MaintenanceReminder param={{ customerId: id }} />
          </Wrapper>
        </Grid2>
      </Grid2>

      {/* Hàng 4: Danh sách thiết bị & Thiết bị đã thay thế */}
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Wrapper title="Danh sách thiết bị">
            <ProductList param={{ customerId: id }} isPage={false} />
          </Wrapper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Wrapper title="Linh kiện cần thay thế">
            <ProductList param={{ customerId: id }} isPage={false} />
          </Wrapper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CustomerDetail;
