import { yupResolver } from "@hookform/resolvers/yup";
import errorDetailApi from "@modules/maintenance/apis/errorDetailApi";
import {
  unwrapError,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { CreateErrorDetailDto } from "@modules/maintenance/datas/errorDetail/CreateErrorDetailDto";
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
import TypeErrorSelect from "../common/select/TypeErrorSelect";

// Định nghĩa schema validation với Yup
const schema = yup.object({
  code: yup.string().required("Name is required"),
  content: yup.string().required("Code is required"),
  typeErrorId: yup.string().required("Type device is required"),
});

// Định nghĩa kiểu dữ liệu của form

interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const ErrorDetailCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateErrorDetailDto>({
    defaultValues: {
      code: "",
      content: "",
      typeErrorId: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { notify } = useNotification();

  // Fetch dữ liệu từ id

  useEffect(() => {
    if (id) {
      setLoading(true);
      errorDetailApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          reset(res as CreateErrorDetailDto); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = async (data: CreateErrorDetailDto) => {
    setLoading(true);
    try {
      if (id) {
        // Logic cập nhật (update)
        const res = await errorDetailApi.update(id, data);
        notify(res.message, "success");
      } else {
        // Logic tạo mới (create)
        const res = await errorDetailApi.post(data);
        notify(res.message, "success");
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
                Lỗi
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.content}
                  helperText={errors.content?.message}
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
              name="typeErrorId"
              control={control}
              rules={{
                required: "Please select a device type", // Validate bắt buộc
              }}
              render={({ field }) => (
                <TypeErrorSelect
                  onChange={(value) => field.onChange(value?.id)} // Gọi field.onChange khi select thay đổi
                />
              )}
            />
            {errors.typeErrorId && (
              <p
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginLeft: "14px",
                  marginTop: "5px",
                }}
              >
                {errors.typeErrorId.message}
              </p>
            )}
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

export default ErrorDetailCreateUpdate;
