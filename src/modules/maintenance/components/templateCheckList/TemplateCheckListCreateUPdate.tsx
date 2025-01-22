import { yupResolver } from "@hookform/resolvers/yup";
import {
  unwrapError,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";

import solutionOptionApi from "@modules/maintenance/apis/solutionOptionApi";
import templateCheckListApi from "@modules/maintenance/apis/templateCheckListApi";
import { CreateSolutionOptionDto } from "@modules/maintenance/datas/solutionOption/CreateSolutionOptionDto";
import { CreateTemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/CreateTemplateCheckListDto";
import { Grid2, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNotification } from "../common/Notistack";
import ErrorDetailSelect from "../common/select/ErrorDetailSelect";
import DynamicTable from "../survey/ConfigSuvey";

// Định nghĩa schema validation với Yup
const schema = yup.object({
  code: yup.string().required("Name is required"),
  name: yup.string().required("Code is required"),
  deviceId: yup.string().required("Type device is required"),
  description: yup
    .string()
    .max(255, "Description must be under 255 characters"),
});

// Định nghĩa kiểu dữ liệu của form

interface FormProps {
  id?: string; // Chỉ nhận vào id
}

const TemplateCheckListCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateCheckListDto>({
    defaultValues: {
      code: "",
      description: "",
      name: "",
      deviceId: "",
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
      solutionOptionApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          reset(res as CreateSolutionOptionDto); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = async (data: CreateTemplateCheckListDto) => {
    setLoading(true);
    try {
      if (id) {
        // Logic cập nhật (update)
        const res = await templateCheckListApi.update(id, data);
        notify(res.message, "success");
      } else {
        // Logic tạo mới (create)
        const res = await templateCheckListApi.post(data);
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
    <>
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
                  Mô tả
                </Typography>
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
            <Grid2 size={3}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  Lỗi
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
                  <ErrorDetailSelect
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
        </form>
        {successMessage && (
          <Typography mt={2} color="success.main">
            {successMessage}
          </Typography>
        )}
        <DynamicTable rowCheckLists={[]} />
      </Paper>
    </>
  );
};

export default TemplateCheckListCreateUpdate;
