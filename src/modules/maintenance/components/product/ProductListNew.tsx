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
  Stack,
  Typography,
} from "@mui/material";
const Test = () => {
  const imageUrl =
    "https://linx.com.vn/wp-content/uploads/2022/10/may-in-date-linx-8830.jpg";
  const title = "Máy in linx";
  const description =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam enim exercitationem necessitatibus veniam pariatur, recusandae iusto similique natus! Numquam vel iure provident maiores dolores ducimus rem laudantium corporis sint magni.";

  return (
    <Box sx={{ p: 2 }}>
      <Grid2 container direction={"row"} spacing={1}>
        <Grid2 size={12}>
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
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  padding: 2,
                }}
                image={imageUrl}
                alt={title}
              />
              {/* Trạng thái bên dưới hình ảnh */}
              <Chip
                label={"Hoạt động"}
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
            {/* Nội dung chính của Card */}
            <CardContent sx={{ flex: "1 0 auto", px: 2, mb: "-24px" }}>
              <Stack
                display={"flex"}
                direction={"column"}
                justifyContent={"space-between"}
                height={"100%"}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={"bold"}
                    color={"primary"}
                  >
                    {title}
                  </Typography>
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
                            MDV23B1
                          </Typography>
                        </Grid2>
                        <Grid2 container direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Nhà cung cấp
                          </Typography>
                          <Typography variant="caption" color="info">
                            VMS
                          </Typography>
                        </Grid2>
                        <Grid2 container direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Version
                          </Typography>
                          <Typography variant="caption" color="info">
                            2002
                          </Typography>
                        </Grid2>
                        <Grid2 container direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Loại thiết bị
                          </Typography>
                          <Typography variant="caption" color="info">
                            Máy in
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
                            19/02/2025
                          </Typography>
                        </Grid2>
                        <Grid2 container direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Lần kế tiếp
                          </Typography>
                          <Typography variant="caption" color="info">
                            19/02/2025
                          </Typography>
                        </Grid2>
                        <Grid2 container direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Đã bảo trì
                          </Typography>
                          <Typography variant="caption" color="info">
                            8 lần
                          </Typography>
                        </Grid2>
                        <Grid2 container direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Chu kì
                          </Typography>
                          <Typography variant="caption" color="info">
                            8 tuần
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
                        <Grid2
                          container
                          direction="row"
                          spacing={1}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Grid2>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              19/02/2025
                            </Typography>
                          </Grid2>

                          <Grid2>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Đặng Nhị Thiên
                            </Typography>
                          </Grid2>
                          <Grid2>
                            <Chip label="Đợi duyệt" color="info" size="small" />
                          </Grid2>
                        </Grid2>
                        <Grid2
                          container
                          direction="row"
                          spacing={1}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Grid2>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              19/02/2025
                            </Typography>
                          </Grid2>

                          <Grid2>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Đặng Nhị Thiên
                            </Typography>
                          </Grid2>
                          <Grid2>
                            <Chip label="Đợi duyệt" color="info" size="small" />
                          </Grid2>
                        </Grid2>
                        <Grid2
                          container
                          direction="row"
                          spacing={1}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Grid2>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              19/02/2025
                            </Typography>
                          </Grid2>

                          <Grid2>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Đặng Nhị Thiên
                            </Typography>
                          </Grid2>
                          <Grid2>
                            <Chip label="Đợi duyệt" color="info" size="small" />
                          </Grid2>
                        </Grid2>
                      </Grid2>
                    </Grid2>
                    <Grid2 container direction="column" spacing={1} size={3}>
                      <Typography variant="body2" fontWeight={"bold"}>
                        Ghi chú
                      </Typography>
                      <Grid2 container direction={"column"} px={2}>
                        <Typography variant="caption" color="text.secondary">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Repellat, autem.
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
                        19/02/2025
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <PinDropIcon
                        sx={{ fontSize: "16px", mt: "-1.5px !important" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Xưởng 3, line 5, Q12, HCM
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
            {/* Các hành động (nút) */}
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Test;
