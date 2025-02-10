import StyledDataGrid from "@components/StyledDataGrid";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
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
      field: "checkTime",
      headerName: "Ngày tạo",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.checkTime &&
            new Date(params.row.checkTime).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
        </Link>
      ),
    },
    {
      field: "createdBy",
      headerName: "Người tạo",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "",
      headerName: "Thiết bị",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => <span>{params.row.product?.name}</span>,
    },
  ];

  return (
    <>
      {/* Bọc DataGrid trong Box để kiểm soát kích thước tổng thể */}
      <Box sx={{ width: "100%", height: "auto" }}>
        <StyledDataGrid
          sx={{
            height: 400, // Chiều cao cố định cho bảng
            width: "100%",
            "& .MuiDataGrid-cell": { padding: "8px" }, // Điều chỉnh padding trong các cell
          }}
          columns={columns}
          rows={taskChecks}
          hideFooter
        />
      </Box>
    </>
  );
};

export default WaitingTaskList;
