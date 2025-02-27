import ImageBase64 from "@components/ImageBase64";
import { EnumStatusTaskCheck } from "@modules/maintenance/datas/enum/EnumStatusTaskCheck";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import AppsIcon from "@mui/icons-material/Apps";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ChipTaskCheckStatus from "../common/chip/ChipTaskCheckStatus";
interface Props {
  data: ProductDto;
}
const ProductRowDetail: React.FC<Props> = ({ data }) => {
  if (!data) return <></>;
  return (
    <Card sx={{ display: "flex", width: "100%", p: 1 }} variant="outlined">
      {/* Hiển thị hình ảnh bên trái */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "1px solid #ccc",
        }}
      >
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Typography variant="caption" sx={{ color: "#c3c3c3" }}>
            Seri: {data.serialNumber}
          </Typography>
        </Box>
        {/* <CardMedia
          component="img"
          sx={{
            width: 150,
            height: 150,
            objectFit: "cover",
            padding: 1,
          }}
          image={
            data.image ||
            "https://linx.com.vn/wp-content/uploads/2022/10/may-in-date-linx-8830.jpg"
          }
          alt={data.serialNumber}
        /> */}
        <Box pr={1}>
          <ImageBase64 imageData={data.image || ""} width={200} height={150} />
        </Box>
        {/* Trạng thái bên dưới hình ảnh */}
        <Chip label={"Hoạt động"} color="success" size="small" sx={{ mt: 2 }} />
      </Box>
      {/* Nội dung chính của Card */}
      <CardContent sx={{ flex: "1 0 auto", px: 2, py: 1, mb: "-24px" }}>
        <Stack
          display={"flex"}
          direction={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                fontWeight={"bold"}
                color={"primary"}
              >
                <Link
                  to={`/product/detail-new/${data.id}`}
                  style={{ color: "#002f77" }}
                >
                  {data.name}
                </Link>
              </Typography>
              <Tooltip title="xem chi tiết">
                <Link to={`/product/detail-new/${data.id}`}>
                  <IconButton>
                    <AppsIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Stack>
            <Divider sx={{ width: "100%", mb: 1 }} />
            <Grid2 container direction="row" spacing={2}>
              <Grid2
                container
                direction="column"
                spacing={1}
                size={4}
                sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Thông tin máy
                </Typography>
                <Grid2 container direction="column" px={2}>
                  <InfoItem
                    label="Seri"
                    value={data.serialNumber?.toString() || ""}
                  />
                  <InfoItem label="Nhà cung cấp" value={data.supplier || ""} />
                  <InfoItem
                    label="Nhóm thiết bị"
                    value={data.device?.name || ""}
                  />
                  <InfoItem
                    label="Khách hàng"
                    value={data.customer?.name || ""}
                  />
                </Grid2>
              </Grid2>
              <Grid2
                container
                direction="column"
                spacing={1}
                size={3}
                sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Thông tin bảo trì
                </Typography>
                <Grid2 container direction="column" px={2}>
                  <InfoItem
                    label="Lần gần nhất"
                    value={
                      data.lastMaintenanceDate
                        ? new Date(data.lastMaintenanceDate).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }
                          )
                        : ""
                    }
                  />
                  <InfoItem
                    label="Lần kế tiếp"
                    value={
                      data.nextMaintenanceReminder
                        ? new Date(
                            data.nextMaintenanceReminder
                          ).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : ""
                    }
                  />
                  <InfoItem
                    label="Đã bảo trì"
                    value={(data.maintenanceTimes?.toString() || "0") + " lần"}
                  />
                  <InfoItem
                    label="Chu kì"
                    value={
                      data.maintenanceCycle?.toString() + " ngày" || " 0 ngày"
                    }
                  />
                </Grid2>
              </Grid2>
              <Grid2
                container
                direction="column"
                spacing={1}
                size={5}
                sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight={"bold"}>
                  Bảo trì gần đây
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  {!data.taskChecks || data.taskChecks.length == 0 ? (
                    <Typography variant="caption" textAlign={"center"} mt={3}>
                      Không có dữ liệu
                    </Typography>
                  ) : (
                    data.taskChecks?.slice(0, 3).map((item, index) => {
                      return (
                        <Link
                          to={"/task-check/detail/" + item.id}
                          style={{ textDecoration: "none" }}
                        >
                          <Grid2
                            container
                            direction="row"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{
                              borderRadius: 1, // Rounded corners
                              transition: "background-color 0.3s", // Smooth transition
                              "&:hover": {
                                backgroundColor: "#f0f0f0", // Light gray background on hover
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Grid2>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                <span>
                                  {item.createdDate &&
                                    new Date(
                                      item.createdDate
                                    ).toLocaleDateString("vi-VN", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    })}
                                </span>
                              </Typography>
                            </Grid2>

                            <Grid2>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {item.name}
                              </Typography>
                            </Grid2>
                            <Grid2>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {item.taskCreator}
                              </Typography>
                            </Grid2>

                            <Grid2>
                              <ChipTaskCheckStatus
                                status={EnumStatusTaskCheck.CREATED}
                              />
                            </Grid2>
                          </Grid2>
                        </Link>
                      );
                    })
                  )}
                </Grid2>
              </Grid2>
              {/* <Grid2 container direction="column" spacing={1} size={2}>
                <Typography variant="body2" fontWeight={"bold"}>
                  Ghi chú
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  <Typography variant="caption" color="text.secondary">
                    {data.note}
                  </Typography>
                </Grid2>
              </Grid2> */}
            </Grid2>
          </Box>
          <Box>
            <Divider sx={{ width: "100%", my: 1 }} />
            <Stack direction="row" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <EventNoteIcon
                  sx={{ fontSize: "16px", mt: "-1.5px !important" }}
                />
                <Typography variant="caption" color="text.secondary">
                  <span>
                    Ngày lắp đặt:{" "}
                    {data.installationDate
                      ? new Date(data.installationDate).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          }
                        )
                      : ""}
                  </span>
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <PinDropIcon
                  sx={{ fontSize: "16px", mt: "-1.5px !important" }}
                />
                <Typography variant="caption" color="text.secondary">
                  Địa chỉ: {data.address}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      {/* Các hành động (nút) */}
    </Card>
  );
};
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box display="flex">
    <Typography variant="caption" color="textSecondary" mr={1} minWidth={90}>
      {label}:
    </Typography>
    <Typography variant="caption" color="info" fontWeight="bold">
      {value}
    </Typography>
  </Box>
);

export default ProductRowDetail;
