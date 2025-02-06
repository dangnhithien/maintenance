import StyledDataGrid from "@components/StyledDataGrid";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";

const WaitingTaskList = () => {
  const [params, setParams] = useState<GetTaskCheckDto>({
    includeProperties: "TemplateCheck",
    takeCount: 5,
    // taskCheckStatus: EnumStatusTaskCheck.WAITING,
  });
  const { taskChecks } = useTaskCheck(params);

  const columns: GridColDef[] = [
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
      headerName: "Tên biểu mẫu ",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.templateCheck?.name}
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
    {
      field: "createdBy",
      headerName: "Người tạo",
      editable: false,
      sortable: false,
      flex: 1,
    },
  ];

  return (
    <>
      {/* Bọc DataGrid trong Box để kiểm soát kích thước tổng thể */}
      <Box sx={{ width: "100%", height: "auto" }}>
        <StyledDataGrid
          sx={{
            height: 350, // Chiều cao cố định cho bảng
            width: "100%",
            "& .MuiDataGrid-cell": { padding: "8px" }, // Điều chỉnh padding trong các cell
          }}
          columns={columns}
          rows={taskChecks}
          hideFooter
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Link
          to="/approval"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#c3c3c3",
          }}
        >
          Xem thêm <KeyboardDoubleArrowDownIcon fontSize="small" />
        </Link>
      </Box>
    </>
  );
};

export default WaitingTaskList;
