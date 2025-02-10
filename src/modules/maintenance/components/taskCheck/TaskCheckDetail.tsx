import rowCheckValueApi from "@modules/maintenance/apis/rowCheckValueApi";
import taskCheckApi from "@modules/maintenance/apis/taskCheckApi";
import {
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import { TaskCheckDto } from "@modules/maintenance/datas/taskCheck/TaskCheckDto";
import { Grid2, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RowCheckValue from "../survey/RowCheckValue";
interface Props {
  id?: string;
}
const TaskCheckDetail: React.FC<Props> = ({ id }) => {
  const [rowCheckValues, setRowCheckValues] = useState<RowCheckValueDto[]>([
    {
      id: "1",
      rowCheckContent: "Kiểm tra động cơ",
      rowCheckDescription: "Kiểm tra tình trạng động cơ trước khi vận hành",
      errorDetailContent: "Động cơ phát ra tiếng ồn bất thường",
      solutionOptionName: "Bảo trì động cơ",
      solutionOptionDescription:
        "Vệ sinh, thay dầu nhớt và kiểm tra lỗi phần cứng",
      isPassed: false,
      errorDetailId: "E001",
      errorDetailCode: "ERR-MOTOR-01",
      errorDetail: {
        severity: "high",
        description: "Lỗi nghiêm trọng cần xử lý ngay",
      },
      rowCheckListId: "RC001",
      rowCheckListCode: "RC-MOTOR",
      taskCheckId: "TC001",
      taskCheckCode: "TC-MOTOR",
      taskCheck: { status: "pending", assignedTo: "Technician A" },
      solutionOptionId: "SO001",
      solutionOptionCode: "SO-MOTOR",
      solutionOption: { cost: 500000, timeRequired: "2 giờ" },
    },
    {
      id: "2",
      rowCheckContent: "Kiểm tra hệ thống điện",
      rowCheckDescription: "Đánh giá tình trạng dây điện và kết nối",
      errorDetailContent: "Dây điện bị đứt",
      solutionOptionName: "Thay dây điện",
      solutionOptionDescription: "Thay thế dây điện bị hỏng bằng dây mới",
      isPassed: false,
      errorDetailId: "E002",
      errorDetailCode: "ERR-ELEC-02",
      errorDetail: {
        severity: "medium",
        description: "Lỗi có thể gây mất kết nối điện",
      },
      rowCheckListId: "RC002",
      rowCheckListCode: "RC-ELEC",
      taskCheckId: "TC002",
      taskCheckCode: "TC-ELEC",
      taskCheck: { status: "in_progress", assignedTo: "Technician B" },
      solutionOptionId: "SO002",
      solutionOptionCode: "SO-ELEC",
      solutionOption: { cost: 200000, timeRequired: "1 giờ" },
    },
    {
      id: "3",
      rowCheckContent: "Kiểm tra áp suất dầu",
      rowCheckDescription: "Đánh giá áp suất dầu trong hệ thống thủy lực",
      errorDetailContent: "Áp suất dầu thấp hơn mức cho phép",
      solutionOptionName: "Nạp dầu bổ sung",
      solutionOptionDescription:
        "Bổ sung dầu vào hệ thống để đảm bảo hoạt động ổn định",
      isPassed: true,
      errorDetailId: "E003",
      errorDetailCode: "ERR-OIL-03",
      errorDetail: {
        severity: "low",
        description: "Lỗi nhỏ, có thể xử lý sau",
      },
      rowCheckListId: "RC003",
      rowCheckListCode: "RC-OIL",
      taskCheckId: "TC003",
      taskCheckCode: "TC-OIL",
      taskCheck: { status: "completed", assignedTo: "Technician C" },
      solutionOptionId: "SO003",
      solutionOptionCode: "SO-OIL",
      solutionOption: { cost: 100000, timeRequired: "30 phút" },
    },
  ]);
  const [taskCheck, setTaskCheck] = useState<TaskCheckDto>();
  useEffect(() => {
    if (id) {
      rowCheckValueApi
        .get({ taskCheckId: id })
        .then(unwrapListReponse)
        .then((res) => {
          setRowCheckValues(res);
        })
        .catch((err) => {});
      taskCheckApi
        .getById(id, { includeProperties: "TemplateCheck" })
        .then(unwrapObjectReponse)
        .then((res) => {
          setTaskCheck(res);
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <Grid2 container spacing={1}>
      <Paper sx={{ p: 2, width: "100%" }}>
        <Grid2 container justifyContent={"space-between"}>
          <Typography variant="body1" fontWeight={"bold"} color="primary">
            Thông tin
          </Typography>
          <Typography variant="caption" color="textSecondary">
            #{taskCheck?.code}
          </Typography>
        </Grid2>
        <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Tên
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Typography>{taskCheck?.templateCheck?.name}</Typography>
          </Grid2>
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Mô tả
              </Typography>
              <Typography sx={{ color: "white" }}>*</Typography>
            </Stack>
            <Typography>{taskCheck?.templateCheck?.description}</Typography>
          </Grid2>
          <Grid2 size={3}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="primary" fontWeight={"bold"}>
                Thiết bị
              </Typography>
              <Typography color="error">*</Typography>
            </Stack>
            <Typography>{taskCheck?.templateCheck?.name}</Typography>
          </Grid2>
        </Grid2>
        <Grid2 sx={{ mt: 2 }}></Grid2>
      </Paper>

      <Paper sx={{ p: 2, width: "100%" }}>
        <Grid2 container size={12} spacing={1} direction={"column"}>
          {rowCheckValues.map((rowCheckValue, index) => (
            <Grid2 key={index} size={12} spacing={1}>
              <RowCheckValue data={rowCheckValue} />
            </Grid2>
          ))}
        </Grid2>
      </Paper>

      {/* <Grid2>
        <Button variant="contained" color="success">
          Xác nhận
        </Button>
      </Grid2> */}
    </Grid2>
  );
};

export default TaskCheckDetail;
