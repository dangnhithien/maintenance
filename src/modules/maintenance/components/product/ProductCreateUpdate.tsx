import { yupResolver } from "@hookform/resolvers/yup";
import productApi from "@modules/maintenance/apis/productApi";
import {
  unwrapError,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { CreateProductDto } from "@modules/maintenance/datas/product/CreateProductDto";
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
import TypeDeviceSelect from "../common/select/TypeDeviceSelect";

// Định nghĩa schema validation với Yup
const schema = yup.object({
  qrCode: yup.string().required("Name is required"),
  imageQR: yup.string().required("Code is required"),
  deviceId: yup.string().required("Type device is required"),
  serialNumber: yup.string().required("Type device is required"),
  note: yup.string().max(255, "Description must be under 255 characters"),
});

// Định nghĩa kiểu dữ liệu của form

interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const ProductCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductDto>({
    defaultValues: {
      deviceId: "",
      imageQR: "",
      qrCode: "",
      serialNumber: "",
      note: "",
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
      productApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          reset(res as CreateProductDto); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = async (data: CreateProductDto) => {
    setLoading(true);
    try {
      if (id) {
        // Logic cập nhật (update)
        const res = await productApi.update(id, data);
        notify(res.message, "success");
      } else {
        // Logic tạo mới (create)
        const res = await productApi.post(data);
        notify(res.message, "success");
        reset({} as CreateProductDto);
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
                Số seri
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.serialNumber}
                  helperText={errors.serialNumber?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Hình QR
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="imageQR"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.imageQR}
                  helperText={errors.imageQR?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Ghi chú
              </Typography>
            </Stack>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.note}
                  helperText={errors.note?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                QR code
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Controller
              name="qrCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  error={!!errors.qrCode}
                  helperText={errors.qrCode?.message}
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
              name="deviceId"
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
            {errors.deviceId && (
              <p
                style={{
                  color: "#d32f2f",
                  fontSize: "12px",
                  marginLeft: "14px",
                  marginTop: "5px",
                }}
              >
                {errors.deviceId.message}
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

export default ProductCreateUpdate;
