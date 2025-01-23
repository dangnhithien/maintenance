import StyledDataGrid from "@components/StyledDataGrid";

import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Grid2, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
interface Props {
  deviceId?: string;
}
const TaskCheckList: React.FC<Props> = ({ deviceId }) => {
  const { taskChecks, fetchTaskChecks, error, loading, totalCount } =
    useTaskCheck({
      includeProperties: "TemplateCheckList",
    });
  const [params, setParams] = useState<GetTaskCheckDto>({
    includeProperties: "TemplateCheckList",
  });
  useEffect(() => {
    fetchTaskChecks(params);
  }, [params]);
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },

    {
      field: "",
      headerName: "Tên ",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.templateCheckList?.name}
        </Link>
      ),
    },
    {
      field: "checkTime",
      headerName: "Thời gian ",
      editable: false,
      sortable: false,
      flex: 1,
    },
  ];
  return (
    <>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 container justifyContent={"space-between"}>
          <InputSearch
            onSearch={(searchText) => {
              setParams({ ...params, searchTerm: searchText });
            }}
          />
          {/* <Button
            variant="contained"
            color="success"
            component={Link}
            to={"/template-check-list/create/device/" + deviceId}
          >
            <Add />
          </Button> */}
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid
              columns={columns}
              rows={taskChecks}
              rowCount={taskChecks.length}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TaskCheckList;
