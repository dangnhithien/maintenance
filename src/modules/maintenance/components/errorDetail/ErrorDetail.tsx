import { unwrapError } from "@datas/comon/ApiResponse";

import errorDetailApi from "@modules/maintenance/apis/errorDetailApi";
import { ErrorDetailDto } from "@modules/maintenance/datas/errorDetail/ErrorDetailDto";
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
const ErrorDetail: React.FC<Props> = ({ id }) => {
  const [errorDetail, setErrorDetail] = useState<ErrorDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (id) {
      errorDetailApi
        .getById(id)
        .then((res) => setErrorDetail(res.result)) // Cập nhật chi tiết sản phẩm
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

  if (!errorDetail) {
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
            <Typography variant="body1">{errorDetail.code}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Tên</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{errorDetail.content}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Loại lỗi</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{errorDetail.typeErrorCode}</Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/error-detail/create/${errorDetail.id}`}
        >
          Chỉnh sửa
        </Button>
      </Box>
    </Paper>
  );
};

export default ErrorDetail;
