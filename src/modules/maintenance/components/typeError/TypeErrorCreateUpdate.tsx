import { yupResolver } from "@hookform/resolvers/yup";
import typeErrorApi from "@modules/maintenance/apis/typeErrorApi";
import {
  unwrapError,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { CreateTypeErrorDto } from "@modules/maintenance/datas/typeError/CreateTypeErrorDto";
import {
  Button,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNotification } from "../common/Notistack";

// Định nghĩa schema validation với Yup
const schema = yup.object({
  code: yup.string().required("code is required"),
  name: yup.string().required("name is required"),
  description: yup
    .string()
    .max(255, "Description must be under 255 characters"),
});

// Định nghĩa kiểu dữ liệu của form
interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const TypeErrorCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTypeErrorDto>({
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  // Fetch dữ liệu từ id nếu có
  useEffect(() => {
    if (id) {
      setLoading(true);
      typeErrorApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          reset(res as CreateTypeErrorDto); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = async (data: CreateTypeErrorDto) => {
    setLoading(true);
    try {
      if (id) {
        // Logic cập nhật (update)
        const res = await typeErrorApi.update(id, data);
        notify(res.message, "success");
      } else {
        // Logic tạo mới (create)
        const res = await typeErrorApi.post(data);
        notify(res.message, "success");
        reset({} as CreateTypeErrorDto);
      }
    } catch (err) {
      const { message } = unwrapError(err);
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="body1" fontWeight={"bold"} color="primary">
        {id ? "Cập nhật thông tin lỗi" : "Thêm mới lỗi"}
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
              {id ? "Cập nhật" : "Lưu"}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
};

export default TypeErrorCreateUpdate;
