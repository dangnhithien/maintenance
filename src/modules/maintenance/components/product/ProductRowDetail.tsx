import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import AppsIcon from "@mui/icons-material/Apps";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
interface Props {
  data: ProductDto;
}
const ProductRowDetail: React.FC<Props> = ({ data }) => {
  if (!data) return <></>;
  return (
    <Card sx={{ display: "flex", width: "100%", p: 1 }}>
      {/* Hiển thị hình ảnh bên trái */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "1px solid #ccc",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 150,
            height: 150,
            objectFit: "cover",
            padding: 1,
          }}
          image={
            data.imageUrl ||
            "https://linx.com.vn/wp-content/uploads/2022/10/may-in-date-linx-8830.jpg"
          }
          alt={data.serialNumber}
        />
        {/* Trạng thái bên dưới hình ảnh */}
        <Chip label={"Hoạt động"} color="success" size="small" sx={{ mt: 1 }} />
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
                {data.device?.name}
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
                <Typography variant="body2" fontWeight={"bold"}>
                  Thông tin máy
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Seri
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.serialNumber}
                    </Typography>
                  </Grid2>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Nhà cung cấp
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.supplier}
                    </Typography>
                  </Grid2>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Version
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.version}
                    </Typography>
                  </Grid2>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Loại thiết bị
                    </Typography>
                    <Typography variant="caption" color="info">
                      {}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2
                container
                direction="column"
                spacing={1}
                size={3}
                sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight={"bold"}>
                  Thông tin bảo trì
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Lần gần nhất
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.lastMaintenanceDate?.toISOString()}
                    </Typography>
                  </Grid2>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Lần kế tiếp
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.nextMaintenanceReminder?.toISOString()}
                    </Typography>
                  </Grid2>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Đã bảo trì
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.maintenanceTimes}
                    </Typography>
                  </Grid2>
                  <Grid2 container direction="row" spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Chu kì
                    </Typography>
                    <Typography variant="caption" color="info">
                      {data.maintenanceCycle}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2
                container
                direction="column"
                spacing={1}
                size={3}
                sx={{ borderRight: "1px solid #ccc" }}
              >
                <Typography variant="body2" fontWeight={"bold"}>
                  Bảo trì gần đây
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  {data.taskChecks?.map((item, index) => {
                    return (
                      <Grid2
                        container
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Grid2>
                          <Typography variant="caption" color="text.secondary">
                            {item.checkTime}
                          </Typography>
                        </Grid2>

                        <Grid2>
                          <Typography variant="caption" color="text.secondary">
                            {item.createdBy}
                          </Typography>
                        </Grid2>
                        <Grid2>
                          <Chip label={item.status} color="info" size="small" />
                        </Grid2>
                      </Grid2>
                    );
                  })}
                </Grid2>
              </Grid2>
              <Grid2 container direction="column" spacing={1} size={3}>
                <Typography variant="body2" fontWeight={"bold"}>
                  Ghi chú
                </Typography>
                <Grid2 container direction={"column"} px={2}>
                  <Typography variant="caption" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, autem.
                  </Typography>
                </Grid2>
              </Grid2>
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
                  {data.installtionDate?.toISOString()}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <PinDropIcon
                  sx={{ fontSize: "16px", mt: "-1.5px !important" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {data.address}
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

export default ProductRowDetail;
