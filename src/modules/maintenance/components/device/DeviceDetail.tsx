import deviceApi from "@modules/maintenance/apis/deviceApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import { DeviceDto } from "@modules/maintenance/datas/device/DeviceDto";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../common/Notistack";

interface Props {
  id?: string;
}
const DeviceDetail: React.FC<Props> = ({ id }) => {
  const [device, setDevice] = useState<DeviceDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (id) {
      deviceApi
        .getById(id, { includeProperties: "TypeDevice" })
        .then((res) => setDevice(res.result)) // Cập nhật chi tiết sản phẩm
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (!device) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="error">
          Không tìm thấy sản phẩm.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
        Chi tiết loại sản phẩm
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Mã</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{device.code}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Tên</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{device.name}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Loại thiết bị</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{device.typeDevice?.name}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Mô tả</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{device.description}</Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/device/create/${device.id}`}
        >
          Chỉnh sửa
        </Button>
      </Box>
    </Paper>
  );
};

export default DeviceDetail;
