import PaginatedDataGrid from "@components/PaginationDatagrid";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Warning } from "@mui/icons-material";
import { Box, Grid2 } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
import { useNotification } from "../common/Notistack";
import PopupConfirm from "../common/PopupConfirm";
import ChipTaskCheckStatus from "../common/chip/ChipTaskCheckStatus";

interface Props {
  param?: GetTaskCheckDto;
}
const TaskCheckList: React.FC<Props> = ({ param }) => {
  const [openPopupTemplateWarning, setOpenPopupTemplateWarning] =
    useState(false);
  const { notify } = useNotification();
  const [params, setParams] = useState<GetTaskCheckDto>({
    ...param,
    includeProperties: "TemplateCheck,Product,Customer",
    takeCount: 5,
    sortBy: "CreatedDate DESC",
  });

  const {
    taskChecks,
    fetchTaskChecks,
    deleteTaskCheck,
    restoreTaskCheck,
    error,
    loading,
    totalCount,
  } = useTaskCheck();

  useEffect(() => {
    fetchTaskChecks(params); // Gọi khi cần
  }, [params]);
  // Hàm dùng để mở popup cảnh báo nếu không có templateCheckId
  const handleOpenTemplateWarning = () => {
    setOpenPopupTemplateWarning(true);
  };

  const handleCloseTemplateWarning = () => {
    setOpenPopupTemplateWarning(false);
  };

  // Hàm render chung cho các cell cần link
  const renderConditionalLink = (params: any, fieldValue: any) => {
    if (params.row.templateCheckId) {
      return (
        <Link to={`/task-check/detail/${params.row.id}`}>{fieldValue}</Link>
      );
    }
    return (
      <span style={{ cursor: "pointer" }} onClick={handleOpenTemplateWarning}>
        {fieldValue}
      </span>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã ",
      width: 100,
      renderCell: (params: any) =>
        renderConditionalLink(params, params.row.code),
    },
    {
      field: "name",
      align: "center",
      headerAlign: "center",
      headerName: "Tên ",
      flex: 1,
      renderCell: (params: any) =>
        renderConditionalLink(params, params.row.name),
    },
    {
      field: "productName",
      headerName: "Thiết bị",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params: any) =>
        renderConditionalLink(params, params.row.product?.name),
    },
    {
      field: "customerName",
      headerName: "Khách hàng ",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params: any) =>
        renderConditionalLink(params, params.row.customer?.name),
    },
    {
      field: "createdDate",
      align: "center",
      headerAlign: "center",
      headerName: "Ngày tạo",
      flex: 1,
      renderCell: (params: any) =>
        renderConditionalLink(
          params,
          params.row.createdDate &&
            new Date(params.row.createdDate).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
        ),
    },
    {
      field: "taskCreator",
      headerName: "Người tạo",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "assigneeName",
      headerName: "Kĩ thuật viên",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "taskCheckStatus",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: (params: any) => (
        <ChipTaskCheckStatus status={params.row.taskCheckStatus} />
      ),
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
          {/* ... các nút khác nếu cần ... */}
        </Grid2>
        <Grid2>
          <Box>
            <PaginatedDataGrid
              columns={columns}
              rows={taskChecks}
              totalCount={totalCount}
              setParams={setParams}
              rowSelection={false}
              loading={loading}
              disableRowSelectionOnClick
              checkboxSelection={false}
            />
          </Box>
        </Grid2>
      </Grid2>

      <PopupConfirm
        haveButtons={false}
        open={openPopupTemplateWarning}
        onClose={handleCloseTemplateWarning}
        onCancel={handleCloseTemplateWarning}
        onConfirm={handleCloseTemplateWarning}
        icon={<Warning fontSize="large" color="warning" />}
        message="Cảnh báo"
        subMessage="Không thể xem chi tiết vì task chưa lựa chọn loại phiếu"
        sx={{ width: 450 }}
      />
    </>
  );
};

export default TaskCheckList;
