import ImageBase64 from "@components/ImageBase64";
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
    <Card
      sx={{ display: "flex", width: "100%", border: "none" }}
      variant="outlined"
    >
      {/* Hiển thị hình ảnh bên trái */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // borderRight: "1px solid #ccc",
        }}
      >
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
                size={3}
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
                size={4}
                sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Thông tin bảo trì lin kiện
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  {/* Nếu có nhiều hơn 3 dòng, hiển thị dòng header cố định */}

                  <Grid2
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: "#f5f5f5",

                      borderRadius: 1,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <Grid2 size={4}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        textAlign={"center"}
                        sx={{ display: "block", width: "100%" }}
                      >
                        Tên
                      </Typography>
                    </Grid2>

                    <Grid2 size={4}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", width: "100%" }}
                        color="text.secondary"
                        textAlign={"center"}
                      >
                        Gần nhất
                      </Typography>
                    </Grid2>
                    <Grid2 size={4}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", width: "100%" }}
                        color="text.secondary"
                        textAlign={"center"}
                      >
                        Tiếp theo
                      </Typography>
                    </Grid2>
                  </Grid2>

                  {!data.components || data.components.length == 0 ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "block", width: "100%" }}
                      textAlign={"center"}
                      mt={3}
                    >
                      Không có dữ liệu
                    </Typography>
                  ) : (
                    <Box sx={{ maxHeight: "100px", overflowY: "auto" }}>
                      {data.components?.map((item, index) => (
                        <Grid2
                          key={index}
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          spacing={1}
                          sx={{
                            borderRadius: 1, // Rounded corners
                            transition: "background-color 0.3s", // Smooth transition
                            "&:hover": {
                              backgroundColor: "#f0f0f0", // Light gray background on hover
                              cursor: "pointer",
                            },
                          }}
                        >
                          <Grid2 size={4}>
                            <Typography
                              textAlign="center"
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "block",
                                width: "100%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Grid2>

                          <Grid2 size={4}>
                            <Typography
                              variant="caption"
                              sx={{ display: "block", width: "100%" }}
                              color="text.secondary"
                              textAlign={"center"}
                            >
                              {item.lastMaintenanceDate &&
                                new Date(
                                  item.lastMaintenanceDate
                                ).toLocaleDateString("vi-VN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })}
                            </Typography>
                          </Grid2>
                          <Grid2 size={4}>
                            <Typography
                              variant="caption"
                              sx={{ display: "block", width: "100%" }}
                              color="text.secondary"
                              textAlign={"center"}
                            >
                              {item.nextMaintenanceDate &&
                                new Date(
                                  item.nextMaintenanceDate
                                ).toLocaleDateString("vi-VN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })}
                            </Typography>
                          </Grid2>
                        </Grid2>
                      ))}
                    </Box>
                  )}
                </Grid2>
              </Grid2>
              <Grid2
                container
                direction="column"
                spacing={1}
                size={5}
                // sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight={"bold"}>
                  Bảo trì gần đây
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  <Grid2
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: "#f5f5f5",

                      borderRadius: 1,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <Grid2 size={3}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", width: "100%" }}
                        color="text.secondary"
                        textAlign={"center"}
                      >
                        Ngày bảo trì
                      </Typography>
                    </Grid2>
                    <Grid2 size={4}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", width: "100%" }}
                        color="text.secondary"
                        textAlign={"center"}
                      >
                        Tên
                      </Typography>
                    </Grid2>
                    <Grid2 size={2}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", width: "100%" }}
                        color="text.secondary "
                        textAlign={"center"}
                      >
                        Người tạo
                      </Typography>
                    </Grid2>
                    <Grid2 size={3}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", width: "100%" }}
                        color="text.secondary"
                        textAlign={"center"}
                      >
                        Trạng thái
                      </Typography>
                    </Grid2>
                  </Grid2>

                  {!data.taskChecks || data.taskChecks.length == 0 ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "block", width: "100%" }}
                      textAlign={"center"}
                      mt={3}
                    >
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
                            spacing={1}
                            sx={{
                              borderRadius: 1, // Rounded corners
                              transition: "background-color 0.3s", // Smooth transition
                              "&:hover": {
                                backgroundColor: "#f0f0f0", // Light gray background on hover
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Grid2 size={3}>
                              <Typography
                                textAlign={"center"}
                                variant="caption"
                                sx={{ display: "block", width: "100%" }}
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

                            <Grid2 size={4}>
                              <Typography
                                textAlign="center"
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  display: "block",
                                  width: "100%", // Chiều rộng cố định (50px)
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.name}
                              </Typography>
                            </Grid2>

                            <Grid2 size={2}>
                              <Typography
                                textAlign={"center"}
                                variant="caption"
                                sx={{ display: "block", width: "100%" }}
                                color="text.secondary"
                              >
                                {item.taskCreator}
                              </Typography>
                            </Grid2>

                            <Grid2 container justifyContent={"center"} size={3}>
                              <ChipTaskCheckStatus
                                status={item.taskCheckStatus}
                                size="small"
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
