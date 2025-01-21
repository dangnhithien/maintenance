import { yupResolver } from "@hookform/resolvers/yup";
import typeDeviceApi from "@modules/maintenance/apis/typeDeviceApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import { CreateTypeDeviceDto } from "@modules/maintenance/datas/typeDevice/CreateTypeDeviceDto";
import {
  Button,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNotification } from "../common/Notistack";

// Định nghĩa schema validation với Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  code: yup.string().required("Code is required"),
  description: yup
    .string()
    .max(255, "Description must be under 255 characters"),
});

// Định nghĩa kiểu dữ liệu của form

interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const TypeDeviceCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTypeDeviceDto>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  // Fetch dữ liệu từ id

  const onSubmit = async (data: CreateTypeDeviceDto) => {
    console.log(data);
    await typeDeviceApi
      .post(data)
      .then((res) => {
        notify(res.message, "success");
      })
      .catch((err) => {
        const { message } = unwrapError(err);
        notify(message, "error");
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="body1" fontWeight={"bold"} color="primary">
        Thông tin thiết bị
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
          <Grid2 size={4}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Mã
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={4}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Tên
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={4}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Mô tả
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 container justifyContent={"center"} mt={2}>
          <Grid2>
            <Button variant="contained" color="success" type="submit" fullWidth>
              Lưu
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
};

export default TypeDeviceCreateUpdate;
