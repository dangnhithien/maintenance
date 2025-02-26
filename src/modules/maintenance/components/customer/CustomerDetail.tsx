import { unwrapError, unwrapObjectReponse } from "@datas/comon/ApiResponse";
import customerApi from "@modules/maintenance/apis/customerApi";
import { CustomerDto } from "@modules/maintenance/datas/customer/CustomerDto";
import { CustomerOverview } from "@modules/maintenance/datas/customer/CustomerOverview";
import {
  Avatar,
  Box,
  Grid2,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MaintenanceReminder from "../product/MaintenanceReminder";
import ProductList from "../product/ProductList";
import TaskCheckList from "../taskCheck/TaskCheckList";

interface Props {
  id?: string;
}

const CustomerDetail: React.FC<Props> = ({ id }) => {
  const [customer, setCustomer] = useState<CustomerDto | null>(null);
  const [customerOverView, setCustomerOverView] = useState<CustomerOverview>();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (id) {
      customerApi
        .getById(id)
        .then((res) => {
          setCustomer(res.result);
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          console.error(message);
        });

      customerApi
        .getOverviewCustomerTaskCheck({ customerId: id })
        .then(unwrapObjectReponse)
        .then((response) => {
          setCustomerOverView(response);
        });
    }
  }, [id]);

  return (
    <Box>
      <Grid2 container spacing={2} alignItems="stretch" sx={{ height: "100%" }}>
        <Grid2
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", height: "100%" }}
        >
          <Paper
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 5,
              width: "100%",
              minHeight: "450px",
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Header with Edit Icon */}
            {/* <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold" }}
              ></Typography>
              <IconButton size="small">
                <Link to={"/customer/create/" + id}>
                  <EditIcon fontSize="small" color="action" />
                </Link>
              </IconButton>
            </Box> */}

            {/* Avatar Section */}
            <Avatar
              src="https://img.freepik.com/premium-vector/company-logo-with-avatar-design_1465-2.jpg"
              sx={{
                width: 200,
                height: 200,
                marginTop: 2,
                boxShadow: 3,
              }}
            />

            {/* User Information */}
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              {customer?.name}
            </Typography>

            {/* Metrics Section Styled */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // background: "linear-gradient(90deg, #002f77, #0066cc, #00f2fe)",

                borderRadius: "20px",
                padding: "10px 20px",
                mt: 3,
                // color: "white",
                width: "100%",
                boxShadow: 3,
              }}
            >
              {/* Metric Items */}
              {[
                {
                  label: "Tổng thiết bị",
                  value: `${customerOverView?.totalProduct ?? "0"} `,
                },
                {
                  label: "Tổng số lần bảo trì",
                  value: `${customerOverView?.totalHistoryTaskCheck ?? "0"} `,
                },
                {
                  label: "Bảo trì hôm nay",
                  value: `${customerOverView?.totalScheduleTaskCheck ?? "0"} `,
                },
              ].map((metric, index) => (
                <Box key={index} sx={{ textAlign: "center", flex: 1 }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {metric.label}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mt: 0.5 }}
                  >
                    {metric.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid2>

        {/* Tabs for different sections */}
        <Grid2
          size={{ xs: 12, md: 8 }}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Paper
            sx={{
              p: 3,
              boxShadow: 3,
              borderRadius: 4,
              height: "100%",
              minHeight: 450,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Lịch sử bảo trì" />
              <Tab label="Thiết bị cần bảo trì" />
              <Tab label="Danh sách thiết bị" />
              <Tab label="Linh kiện thay thế" />
            </Tabs>
            <Box sx={{ flexGrow: 1, overflow: "auto" }} p={2}>
              {tabValue === 0 && <TaskCheckList param={{ customerId: id }} />}
              {tabValue === 1 && (
                <MaintenanceReminder param={{ customerId: id }} />
              )}
              {tabValue === 2 && (
                <ProductList param={{ customerId: id }} isPage={false} />
              )}
              {tabValue === 3 && (
                <ProductList param={{ customerId: id }} isPage={false} />
              )}
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CustomerDetail;
