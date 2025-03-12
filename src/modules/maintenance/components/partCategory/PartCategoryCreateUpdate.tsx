import ImageUpload from "@components/ImageUpload";
import { unwrapError, unwrapObjectReponse } from "@datas/comon/ApiResponse";
import { yupResolver } from "@hookform/resolvers/yup";

import partCategoryApi from "@modules/maintenance/apis/partCategoryApi";

import { IPartCategoryCreate } from "@modules/maintenance/datas/partCategory/IPartCategoryCreate";
import { Button, Grid2, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNotification } from "../common/Notistack";

// Updated schema: removed validations for note and address
const schema = yup.object({
  name: yup.string().required("Không được bỏ trống"),
  code: yup.string().required("Không được bỏ trống"),
  description: yup.string().max(255, "Giới hạn 255 ký tự"),
  image: yup.string(),
});

interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const PartCategoryCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPartCategoryCreate>({
    defaultValues: {
      code: "",
      description: "",
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
      partCategoryApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          reset(res as IPartCategoryCreate); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, [id, reset]);

  const onSubmit = async (data: IPartCategoryCreate) => {
    setLoading(true);
    console.log(data);
    try {
      if (id) {
        // Logic cập nhật (update)
        const res = await partCategoryApi.update(id, data);
        notify(res.message, "success");
      } else {
        // Logic tạo mới (create)
        const res = await partCategoryApi.post(data);
        notify(res.message, "success");
        reset({} as IPartCategoryCreate);
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
    <>
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
                <Typography sx={{ color: "#ffffff" }}>*</Typography>
              </Stack>
              <Controller
                name="description"
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
    </>
  );
};

export default PartCategoryCreateUpdate;
