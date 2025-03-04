import { unwrapError } from "@datas/comon/ApiResponse";

import solutionOptionApi from "@modules/maintenance/apis/solutionOptionApi";
import { SolutionOptionDto } from "@modules/maintenance/datas/solutionOption/SolutionOptionDto";
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
const SolutionOptionDetail: React.FC<Props> = ({ id }) => {
  const [solutionOption, setSolutionOption] =
    useState<SolutionOptionDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    if (id) {
      solutionOptionApi
        .getById(id, { includeProperties: "ErrorDetail" })
        .then((res) => setSolutionOption(res.result)) // Cập nhật chi tiết sản phẩm
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

  if (!solutionOption) {
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
            <Typography variant="body1">{solutionOption.code}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Tên</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{solutionOption.content}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Mô tả</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">
              {solutionOption.description}
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={3} direction={"column"}>
          <Grid2>
            <Typography variant="body1">
              <strong>Lỗi</strong>
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">
              {solutionOption.errorDetail?.content}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/solution-option/create/${solutionOption.id}`}
        >
          Chỉnh sửa
        </Button>
      </Box>
    </Paper>
  );
};

export default SolutionOptionDetail;
