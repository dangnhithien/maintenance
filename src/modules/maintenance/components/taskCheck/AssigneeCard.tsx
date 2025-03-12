import ImageBase64 from "@components/ImageBase64";
import { unwrapListReponse } from "@datas/comon/ApiResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import templateCheckListApi from "@modules/maintenance/apis/templateCheckListApi";
import { ICase } from "@modules/maintenance/datas/case/ICase";
import { IDevice } from "@modules/maintenance/datas/device/IDevice";
import { CreateTaskCheckDto } from "@modules/maintenance/datas/taskCheck/CreateTaskCheckDto";
import { TemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/TemplateCheckListDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { UserDto } from "@modules/user/datas/user/UserDto";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useNotification } from "../common/Notistack";

interface Props {
  product: IDevice;
  technicians: UserDto[];
  cases: ICase[];
}

// Schema validate với yup
const schema = yup.object({
  name: yup.string(), // Tùy chọn
  note: yup.string(), // Tùy chọn
  templateCheckId: yup.string().required("Phiếu là bắt buộc"),
  deviceId: yup.string().required("Không được bỏ trống"),
  assigneeId: yup.string().required("Không được bỏ trống"),
  caseTaskId: yup.string().required("Không được bỏ trống"),
  scheduledTime: yup
    .string()
    .typeError("Ngày đến bảo trì không hợp lệ")
    .required("Ngày đến bảo trì là bắt buộc"),
});

const AssigneeCard: React.FC<Props> = ({ product, technicians, cases }) => {
  const navigate = useNavigate();
  const { createTaskCheck } = useTaskCheck();
  const [templateCheckList, setTemplateCheckList] = useState<
    TemplateCheckListDto[]
  >([]);
  const { notify } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskCheckDto>({
    defaultValues: {
      name: "Phiếu tạo bởi quản lí",
      note: "",
      templateCheckId: "",
      deviceId: product.id,
      assigneeId: "",
      scheduledTime: new Date().toISOString().split("T")[0],
      caseTaskId: "",
    },
    resolver: yupResolver(schema),
  });

  const handleTemplateSelectOpen = async () => {
    if (templateCheckList.length === 0) {
      await templateCheckListApi
        .get()
        .then(unwrapListReponse)
        .then((res) => setTemplateCheckList(res))
        .catch((error) =>
          console.error("Error loading template check list:", error)
        );
    }
  };

  const onSubmit: SubmitHandler<CreateTaskCheckDto> = async (data) => {
    await createTaskCheck(data)
      .then(() => notify("Thêm yêu cầu bảo trì thành công", "success"))
      .catch(() => notify("Không thành công", "error"))
      .finally(async () => {
        // await delay(2000); // Simulate delay for loading data
        navigate("/task-check");
      });
  };

  return (
    <Grid2 size={{ xs: 6 }} key={product.id}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Image Section */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ImageBase64
            imageData={product.image || ""}
            sx={{ width: 200, height: 200, borderRadius: 2 }}
          />
        </Box>

        {/* Info and Form Section */}
        <Box sx={{ flex: "1", pl: 3 }}>
          <Tooltip title={product.name} placement="top-start">
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              <Link
                to={`/product/detail-new/${product.id}`}
                style={{ color: "inherit" }}
              >
                {product.name}
              </Link>
            </Typography>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Serial Number: {product.serialNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Khách hàng: {product.customer?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Đời thiết bị: {product.deviceModel?.name}
          </Typography>

          {/* Form Section */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
            noValidate
          >
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Phiếu</InputLabel>
                  <Controller
                    name="templateCheckId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onOpen={handleTemplateSelectOpen}
                        label="Phiếu"
                        size="small"
                        sx={{
                          "& .MuiSelect-select": {
                            // paddingTop: "6px",
                            paddingBottom: "16px",
                          },
                        }}
                      >
                        {templateCheckList.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.templateCheckId && (
                    <Typography variant="caption" color="error">
                      {errors.templateCheckId.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Case</InputLabel>
                  <Controller
                    name="caseTaskId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Kĩ thuật viên"
                        size="small"
                        sx={{
                          "& .MuiSelect-select": {
                            // paddingTop: "6px",
                            paddingBottom: "16px",
                          },
                        }}
                      >
                        {cases.map((person) => (
                          <MenuItem key={person.id} value={person.id}>
                            {person.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.caseTaskId && (
                    <Typography variant="caption" color="error">
                      {errors.caseTaskId.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Kĩ thuật viên</InputLabel>
                  <Controller
                    name="assigneeId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Kĩ thuật viên"
                        size="small"
                        sx={{
                          "& .MuiSelect-select": {
                            // paddingTop: "6px",
                            paddingBottom: "16px",
                          },
                        }}
                      >
                        {technicians.map((person) => (
                          <MenuItem key={person.id} value={person.id}>
                            {person.fullname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.assigneeId && (
                    <Typography variant="caption" color="error">
                      {errors.assigneeId.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="scheduledTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      size="small"
                      fullWidth
                      error={!!errors.scheduledTime}
                      helperText={errors.scheduledTime?.message}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <Grid2 container>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Tạo task
              </Button>
            </Grid2>
          </Box>
        </Box>
      </Paper>
    </Grid2>
  );
};

export default AssigneeCard;
