import PaginatedDataGrid from "@components/PaginationDatagrid";
import { EnumStatusTaskCheck } from "@modules/maintenance/datas/enum/EnumStatusTaskCheck";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Warning } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
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

  // Local state for new filters
  const [filterDate, setFilterDate] = useState({ start: "", end: "" });
  const [filterStatus, setFilterStatus] = useState("0");

  const [params, setParams] = useState<GetTaskCheckDto>({
    ...param,
    includeProperties: "TemplateCheck,Product,Customer",
    takeCount: 10,
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
    fetchTaskChecks(params);
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
        <Link to={`/task-check/detail/${params.row.id}`}>
          <Tooltip title={fieldValue}>{fieldValue}</Tooltip>
        </Link>
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
      field: "scheduledTime",
      align: "center",
      headerAlign: "center",
      headerName: "Ngày bảo trì",
      flex: 1,
      renderCell: (params: any) =>
        renderConditionalLink(
          params,
          params.row.scheduledTime &&
            new Date(params.row.scheduledTime).toLocaleDateString("vi-VN", {
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
      <Grid2 container direction="column" spacing={2}>
        {/* Filter Controls */}
        <Grid2 container spacing={2}>
          <Grid2>
            <InputSearch
              onSearch={(searchText) => {
                setParams({ ...params, searchTerm: searchText });
              }}
            />
          </Grid2>
          <Grid2 width={150}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Trạng thái</InputLabel>
              <Select
                labelId="status-filter-label" // Đã bỏ comment để liên kết đúng với InputLabel
                id="status-filter"
                value={filterStatus}
                label="Trạng thái"
                size="small"
                onChange={(e) => {
                  const status = e.target.value;
                  setFilterStatus(status);
                  setParams({
                    ...params,
                    taskCheckStatus:
                      status === "0"
                        ? undefined
                        : (status as EnumStatusTaskCheck),
                  });
                }}
              >
                <MenuItem value={"0"}>Tất cả</MenuItem>
                <MenuItem value={EnumStatusTaskCheck.CREATED}>Đã tạo</MenuItem>
                <MenuItem value={EnumStatusTaskCheck.WAITING}>
                  Chờ duyệt
                </MenuItem>
                <MenuItem value={EnumStatusTaskCheck.APPROVED}>
                  Đã duyệt
                </MenuItem>
                <MenuItem value={EnumStatusTaskCheck.REJECTED}>
                  Từ chối
                </MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 width={150}>
            <TextField
              label="Từ ngày"
              type="date"
              value={filterDate.start}
              size="small"
              onChange={(e) => {
                const newStart = e.target.value;
                setFilterDate({ ...filterDate, start: newStart });
                setParams({ ...params, fromDate: new Date(newStart) });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 width={150}>
            <TextField
              label="Đến ngày"
              type="date"
              value={filterDate.end}
              size="small"
              onChange={(e) => {
                const newEnd = e.target.value;
                setFilterDate({ ...filterDate, end: newEnd });
                setParams({ ...params, toDate: new Date(newEnd) });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} marginTop={2}></Grid2>

        {/* DataGrid */}
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
