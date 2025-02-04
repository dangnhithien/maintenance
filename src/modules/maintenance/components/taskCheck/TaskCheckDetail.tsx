import rowCheckValueApi from "@modules/maintenance/apis/rowCheckValueApi";
import taskCheckApi from "@modules/maintenance/apis/taskCheckApi";
import {
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import { TaskCheckDto } from "@modules/maintenance/datas/taskCheck/TaskCheckDto";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Avatar,
  Box,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RowCheckValue from "../survey/RowCheckValue";
interface Props {
  id?: string;
}
const TaskCheckDetail: React.FC<Props> = ({ id }) => {
  const [rowCheckValues, setRowCheckValues] = useState<RowCheckValueDto[]>([
    {
      id: "1",
      rowCheckListName: "Kiểm tra động cơ",
      rowCheckListDescription: "Kiểm tra tình trạng động cơ trước khi vận hành",
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
      rowCheckListName: "Kiểm tra hệ thống điện",
      rowCheckListDescription: "Đánh giá tình trạng dây điện và kết nối",
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
      rowCheckListName: "Kiểm tra áp suất dầu",
      rowCheckListDescription: "Đánh giá áp suất dầu trong hệ thống thủy lực",
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
        .getById(id, { includeProperties: "TemplateCheckList" })
        .then(unwrapObjectReponse)
        .then((res) => {
          setTaskCheck(res);
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <Grid2 container spacing={1}>
      <Container>
        <Paper sx={{ width: "100%", py: 2, px: 4, mb: 1 }}>
          <Grid2 size={12}>
            <Typography
              variant="h5"
              sx={{ textAlign: "justify", lineHeight: 1.6 }}
              fontWeight="bold"
            >
              {taskCheck?.templateCheckList?.name}
            </Typography>
          </Grid2>

          <Grid2 container size={12} direction="row" flexWrap="nowrap">
            {/* Employee Info */}
            <Grid2 container size={6} alignItems="center" spacing={1}>
              <Grid2>
                <Avatar
                  alt="Nhân viên Nguyễn Văn A"
                  src="https://tranhincanvas.com/uploads/images/H%C3%ACnh%20trong%20b%C3%A0i%20h%E1%BB%8Da%20s%C4%A9%20phung%20huyen/20.jpg"
                  sx={{ width: 32, height: 32 }}
                />
              </Grid2>
              <Grid2>
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    Nhân viên
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    Nguyễn Văn A
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>

            {/* Calendar Info */}
            <Grid2 container size={6} alignItems="center" spacing={1}>
              <Grid2>
                <CalendarMonthIcon
                  sx={{ width: 32, height: 32 }}
                  color="primary"
                />
              </Grid2>
              <Grid2>
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    Ngày kiểm tra
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {taskCheck?.checkTime.toString()}
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>

        <Grid2 container size={12} spacing={1} direction={"column"}>
          {rowCheckValues.map((rowCheckValue, index) => (
            <Grid2 key={index} size={12} spacing={1}>
              <RowCheckValue data={rowCheckValue} />
            </Grid2>
          ))}
        </Grid2>

        {/* <Grid2>
        <Button variant="contained" color="success">
          Xác nhận
        </Button>
      </Grid2> */}
      </Container>
    </Grid2>
  );
};

export default TaskCheckDetail;
