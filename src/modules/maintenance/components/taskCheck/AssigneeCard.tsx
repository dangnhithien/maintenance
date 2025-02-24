import ImageBase64 from "@components/ImageBase64";
import { unwrapListReponse } from "@datas/comon/ApiResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import taskCheckApi from "@modules/maintenance/apis/taskCheckApi";
import templateCheckListApi from "@modules/maintenance/apis/templateCheckListApi";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { CreateTaskCheckDto } from "@modules/maintenance/datas/taskCheck/CreateTaskCheckDto";
import { TemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/TemplateCheckListDto";
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
  product: ProductDto;
  technicians: UserDto[];
}

// Schema validate với yup
const schema = yup.object({
  name: yup.string(), // Tùy chọn
  note: yup.string(), // Tùy chọn
  templateCheckId: yup.string().required("Template Check ID là bắt buộc"),
  productId: yup.string().required("Product ID là bắt buộc"),
  assigneeId: yup.string().required("Vui lòng chọn kĩ thuật viên"),
  scheduledTime: yup
    .string()
    .typeError("Ngày đến bảo trì không hợp lệ")
    .required("Ngày đến bảo trì là bắt buộc"),
});

const AssigneeCard: React.FC<Props> = ({ product, technicians }) => {
  const navigate = useNavigate();
  // Khởi tạo danh sách template check rỗng
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
      name: "",
      note: "",
      templateCheckId: "default-template",
      productId: product.id,
      assigneeId: "",
      // Chuyển new Date() thành chuỗi "YYYY-MM-DD" để hiển thị đúng cho input type="date"
      scheduledTime: new Date().toISOString().split("T")[0],
    },
    resolver: yupResolver(schema),
  });

  // Hàm gọi API load danh sách template khi mở select
  const handleTemplateSelectOpen = () => {
    if (templateCheckList.length === 0) {
      templateCheckListApi
        .get({ deviceId: product.deviceId })
        .then(unwrapListReponse)
        .then((res) => {
          setTemplateCheckList(res);
        })
        .catch((error) => {
          console.error("Error loading template check list:", error);
        });
    }
  };

  const onSubmit: SubmitHandler<CreateTaskCheckDto> = async (data) => {
    // Chuyển scheduledTime từ chuỗi sang Date (và chuyển về định dạng mong muốn nếu cần)
    await taskCheckApi
      .post(data)
      .then(() => {
        notify("Thêm yêu cầu bảo trì thành công", "success");
      })
      .catch((error) => {
        notify("Không thành công", "error");
      })
      .finally(() => {
        navigate("/task-check");
      });

    const payload: CreateTaskCheckDto = {
      ...data,
      scheduledTime: new Date(data.scheduledTime).toISOString().split("T")[0],
    };
    console.log(`Product ${product.id} Maintenance Request:`);
    console.log(payload);
    // Gọi API gửi yêu cầu bảo trì với payload cho sản phẩm product.id tại đây
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }} key={product.id}>
      <Paper
        sx={{
          borderRadius: 4,
          p: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ImageBase64
          imageData={product.image || ""}
          sx={{ width: 240, height: 240, mb: 2 }}
        />

        <Tooltip title={product.name} sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main",
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            <Link to={`/product/detail-new/${product.id}`}>{product.name}</Link>
          </Typography>
        </Tooltip>

        <Tooltip title={product.customer?.name || ""}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              mb: 0.5,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            Khách hàng: {product.customer?.name}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Serial Number: {product.serialNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Ngày bảo trì trước:{" "}
          {product.lastMaintenanceDate
            ? new Date(product.lastMaintenanceDate).toLocaleDateString()
            : ""}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Ngày bảo trì kế tiếp:{" "}
          {product.nextMaintenanceReminder
            ? new Date(product.nextMaintenanceReminder).toLocaleDateString()
            : ""}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
          noValidate
        >
          {/* Select Template Check chỉ load danh sách khi mở */}
          <FormControl variant="outlined" fullWidth sx={{ mb: 1 }}>
            <InputLabel id={`template-label-${product.id}`}>
              Template Check
            </InputLabel>
            <Controller
              name="templateCheckId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId={`template-label-${product.id}`}
                  id={`template-${product.id}`}
                  label="Template Check"
                  onOpen={handleTemplateSelectOpen}
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

          {/* Select Kĩ thuật viên */}
          <FormControl variant="outlined" fullWidth sx={{ mb: 1 }}>
            <InputLabel id={`select-label-${product.id}`}>
              Kĩ thuật viên
            </InputLabel>
            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Kĩ thuật viên">
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

          {/* Ngày đến bảo trì */}
          <Controller
            name="scheduledTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                error={!!errors.scheduledTime}
                helperText={errors.scheduledTime?.message}
              />
            )}
          />

          <Box sx={{ mt: 2, width: "100%" }}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Tạo task
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid2>
  );
};

export default AssigneeCard;
