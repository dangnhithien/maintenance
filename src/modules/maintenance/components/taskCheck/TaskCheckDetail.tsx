import rowCheckValueApi from "@modules/maintenance/apis/rowCheckValueApi";
import taskCheckApi from "@modules/maintenance/apis/taskCheckApi";
import {
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import { TaskCheckDto } from "@modules/maintenance/datas/taskCheck/TaskCheckDto";
import { Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfoProduct from "../common/InfoProduct";
import RowCheckValue from "../survey/RowCheckValue";
interface Props {
  id?: string;
}
const TaskCheckDetail: React.FC<Props> = ({ id }) => {
  const [rowCheckValues, setRowCheckValues] = useState<RowCheckValueDto[]>([]);
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
        .getById(id, { includeProperties: "TemplateCheck,Product" })
        .then(unwrapObjectReponse)
        .then((res) => {
          setTaskCheck(res);
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <Grid2 container spacing={1}>
      {taskCheck?.product && <InfoProduct product={taskCheck?.product} />}
      <Grid2 flex={1}>
        <Paper sx={{ p: 2, width: "100%", height: "100%" }}>
          <Typography variant="h6" color="primary" mb={2} fontWeight={"bold"}>
            {taskCheck?.templateCheck?.name}
          </Typography>
          <Grid2 container size={12} spacing={1} direction={"column"}>
            {rowCheckValues.map((rowCheckValue, index) => (
              <Grid2 key={index} size={12} spacing={1}>
                <RowCheckValue data={rowCheckValue} />
              </Grid2>
            ))}
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default TaskCheckDetail;
