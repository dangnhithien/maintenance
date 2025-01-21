import { yupResolver } from "@hookform/resolvers/yup";
import deviceApi from "@modules/maintenance/apis/deviceApi";
import { unwrapError } from "@modules/maintenance/datas/comon/ApiResponse";
import { CreateDeviceDto } from "@modules/maintenance/datas/device/CreateDeviceDto";
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
import TypeDeviceSelect from "../common/select/TypeDeviceSelect";

// Định nghĩa schema validation với Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  code: yup.string().required("Code is required"),
  typeDeviceId: yup.string().required("Type device is required"),
  description: yup
    .string()
    .max(255, "Description must be under 255 characters"),
});

// Định nghĩa kiểu dữ liệu của form

interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const DeviceCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDeviceDto>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      typeDeviceId: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { notify } = useNotification();

  // Fetch dữ liệu từ id

  const onSubmit = async (data: CreateDeviceDto) => {
    console.log(data);
    await deviceApi
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
          <Grid2 size={3}>
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
          <Grid2 size={3}>
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
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Loại thiết bị
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="typeDeviceId"
              control={control}
              rules={{
                required: "Please select a device type", // Validate bắt buộc
              }}
              render={({ field }) => (
                <TypeDeviceSelect
                  onChange={(value) => field.onChange(value?.id)} // Gọi field.onChange khi select thay đổi
                />
              )}
            />
            {errors.typeDeviceId && (
              <p
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginLeft: "14px",
                  marginTop: "5px",
                }}
              >
                {errors.typeDeviceId.message}
              </p>
            )}
          </Grid2>
          <Grid2 size={3}>
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
      {successMessage && (
        <Typography mt={2} color="success.main">
          {successMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default DeviceCreateUpdate;
