import { yupResolver } from "@hookform/resolvers/yup";
import {
  unwrapError,
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";

import rowCheckListApi from "@modules/maintenance/apis/rowCheckListApi";
import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import { CreateTemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/CreateTemplateCheckListDto";
import useTemplateCheckList from "@modules/maintenance/hooks/useTemplateCheckList";
import {
  Button,
  Container,
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
import DynamicTable from "../survey/DynamicTable";

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
  const {
    templateCheckLists,
    deleteChecklist,
    restoreChecklist,
    createChecklist,
    updateChecklist,
    getChecklistById,
    error,
    loading,
    totalCount,
  } = useTemplateCheckList();
  const { notify } = useNotification();
  const [rowChecklists, setRowChecklists] = useState<CreateRowCheckListDto[]>(
    []
  );

  // Fetch dữ liệu từ id

  useEffect(() => {
    if (id) {
      getChecklistById(id, { includeProperties: "Device" })
        .then((res) => {
          reset(res as CreateTemplateCheckListDto); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        });

      rowCheckListApi
        .get({ templateCheckId: id })
        .then(unwrapListReponse)
        .then((res) => {
          setRowChecklists(res as CreateRowCheckListDto[]);
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          // notify(message, "error");
        });
    }
  }, []);

  const onSubmit = async (data: CreateTemplateCheckListDto) => {
    try {
      if (id) {
        // Logic cập nhật (update)
        const res = await updateChecklist({ id: id, updatedData: data });
        notify(res.message, "success");
      } else {
        // Logic tạo mới (create)
        const res = await createChecklist(data)
          .then(unwrapObjectReponse)
          .then((res) => {
            rowChecklists.forEach(async (row: CreateRowCheckListDto, index) => {
              await rowCheckListApi
                .post({
                  ...row,
                  code: res.id + Date.now().toString() + index,
                  templateCheckId: res.id,
                })
                .then(unwrapObjectReponse)
                .catch(unwrapError);
            });
          });
        notify("success", "success");
      }
    } catch (err) {
      const { message } = unwrapError(err);
      notify(message, "error");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body1" fontWeight={"bold"} color="primary">
              Thông tin thiết bị
            </Typography>
            <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
              <Grid2 size={3}>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={"bold"}
                  >
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
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={"bold"}
                  >
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
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={"bold"}
                  >
                    Mô tả
                  </Typography>
                  <Typography sx={{ color: "white" }}>*</Typography>
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
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={"bold"}
                  >
                    Thiết bị
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
                    <DeviceSelect
                      id={field?.value} // Truyền giá trị vào select
                      onChange={(value) => field.onChange(value?.id)} // Gọi field.onChange khi select thay đổi
                      // disabled={true}
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
            <Grid2 sx={{ mt: 2 }}></Grid2>
          </Paper>
        </Container>

        <Container>
          <Paper sx={{ p: 2, mt: 2 }}>
            <DynamicTable
              rowCheckLists={rowChecklists}
              onChange={(data) => {
                setRowChecklists(data);
              }}
            />
            <Grid2 container justifyContent={"center"} mt={2}>
              <Grid2>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  fullWidth
                >
                  Lưu
                </Button>
              </Grid2>
            </Grid2>
          </Paper>
        </Container>
      </form>
    </>
  );
};

export default TemplateCheckListCreateUpdate;
