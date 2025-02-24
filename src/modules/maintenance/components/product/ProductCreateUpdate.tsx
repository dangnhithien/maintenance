import ImageUpload from "@components/ImageUpload";
import { unwrapError, unwrapObjectReponse } from "@datas/comon/ApiResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import productApi from "@modules/maintenance/apis/productApi";
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
import DeviceSelect from "../common/select/DeviceSelect";

// Updated schema: removed validations for note and address
const schema = yup.object({
  deviceId: yup.string().required("Type device is required"),
  serialNumber: yup.string().required("Type device is required"),
  name: yup.string().max(255, "Must be under 255 characters"),
  // note and address validations removed
  maintenanceCycle: yup.number(), // if needed, add validation here
  supplier: yup.string().max(255, "Must be under 255 characters"),
  image: yup.string(),
});

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
      serialNumber: "",
      note: "",
      address: "",
      maintenanceCycle: 0,
      supplier: "",
      version: "",
      image: "",
      name: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { notify } = useNotification();

  // Fetch dữ liệu từ id nếu có
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
  }, [id, reset]);

  const onSubmit = async (data: CreateProductDto) => {
    setLoading(true);
    console.log(data);
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
        <Grid2 container direction={"row"} mt={2} spacing={1}>
          {/* Image upload */}
          <Grid2 mt={2}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  label="Tải hình lên"
                  image={field.value}
                  onImageUpload={(binaryImage) => {
                    field.onChange(binaryImage);
                  }}
                />
              )}
            />
            {errors.image && (
              <Typography color="error" variant="caption">
                {errors.image.message}
              </Typography>
            )}
          </Grid2>
          <Grid2 flex={1} container spacing={2}>
            <Grid2 size={4}>
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
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Tên thiết bị
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
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
                  Ghi chú
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    // No validation message as validation for note is removed
                  />
                )}
              />
            </Grid2>
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Địa chỉ
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    // No validation message as validation for address is removed
                  />
                )}
              />
            </Grid2>
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Ngày lắp đặt
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="installationDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type="date"
                    error={!!errors.installationDate}
                    helperText={errors.installationDate?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Chu kì
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="maintenanceCycle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.maintenanceCycle}
                    helperText={errors.maintenanceCycle?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Nhà cung cấp
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="supplier"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.supplier}
                    helperText={errors.supplier?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Version
                </Typography>
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="version"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.version}
                    helperText={errors.version?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={4}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Nhóm thiết bị
                </Typography>
                <Typography color="error">*</Typography>
              </Stack>
              <Controller
                name="deviceId"
                control={control}
                rules={{
                  required: "Please select a device type",
                }}
                render={({ field }) => (
                  <DeviceSelect
                    id={field?.value}
                    onChange={(value) => field.onChange(value?.id)}
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
