import PaginatedDataGrid from "@components/PaginationDatagrid";
import { EnumStatusTaskCheck } from "@modules/maintenance/datas/enum/EnumStatusTaskCheck";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Warning } from "@mui/icons-material";
import { Grid2, Tooltip } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
import { useNotification } from "../common/Notistack";
import PopupConfirm from "../common/PopupConfirm";
import ChipTaskCheckStatus from "../common/chip/ChipTaskCheckStatus";
interface Props {
  productId?: string;
}
const renderConditionalLink = (params: any, fieldValue: any) => {
  if (params.row.templateCheckId) {
    return (
      <Link to={`/task-check/detail/${params.row.id}`}>
        <Tooltip title={fieldValue}>{fieldValue}</Tooltip>
      </Link>
    );
  }
};
const Approval: React.FC<Props> = ({ productId }) => {
  const [openPopupSoftDelete, setOpenPopupsoftDelete] = useState(false);
  const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false);
  const { notify } = useNotification();
  const [params, setParams] = useState<GetTaskCheckDto>({
    includeProperties: "TemplateCheck,Customer",
    takeCount: 10,
    taskCheckStatus: EnumStatusTaskCheck.WAITING,
    productId: productId || undefined,
    sortBy: "CreatedDate DESC",
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const {
    fetchTaskChecks,
    taskChecks,
    deleteTaskCheck,
    restoreTaskCheck,
    error,
    loading,
    totalCount,
  } = useTaskCheck();

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
        <Link to={`/approval/${params.row.id}`}>{params.row.code}</Link>
      ),
    },

    {
      field: "",
      headerName: "Tên biểu mẫu ",
      minWidth: 300,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/approval/${params.row.id}`}>
          {params.row.templateCheck?.name}
        </Link>
      ),
    },
    {
      field: "taskCheckStatus",
      headerName: "Trạng thái",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <ChipTaskCheckStatus status={params.row.taskCheckStatus} />
      ),
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
      field: "note",
      headerName: "Ghi chú",
      editable: false,
      sortable: false,
      flex: 1,
    },
  ];

  const handleCancelSoftDelete = () => {
    setOpenPopupsoftDelete(false);
  };
  const handleCancelHardDelete = () => {
    setOpenPopupHardDelete(false);
  };

  const onSoftDelete = () => {
    if (rowSelectionModel.length > 0) {
      setOpenPopupsoftDelete(true);
    }
  };
  const onHardDelete = () => {
    if (rowSelectionModel.length > 0) {
      setOpenPopupHardDelete(true);
    }
  };
  const handelConfirmSoftDelete = async () => {
    await deleteTaskCheck({
      isHardDeleted: false,
      ids: rowSelectionModel as string[],
    })
      .then(() => {
        notify("success", "success");
        setOpenPopupsoftDelete(false);
      })
      .catch(() => {});
  };
  const handleConfirmHardDelete = async () => {
    await deleteTaskCheck({
      isHardDeleted: true,
      ids: rowSelectionModel as string[],
    })
      .then(() => {
        notify("success", "success");
        setOpenPopupHardDelete(false);
      })
      .catch(() => {});
  };
  const restore = async () => {
    await restoreTaskCheck(rowSelectionModel as string[])
      .then(() => {
        notify("success", "success");
      })
      .catch(() => {});
  };
  return (
    <>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 container justifyContent={"space-between"}>
          <InputSearch
            onSearch={(searchText) => {
              setParams({ ...params, searchTerm: searchText });
            }}
          />
        </Grid2>
        <Grid2 sx={{ display: "flex", flexGrow: 1 }}>
          <PaginatedDataGrid
            columns={columns}
            rows={taskChecks}
            totalCount={totalCount}
            setParams={setParams}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            loading={loading}
          />
        </Grid2>
      </Grid2>
      <PopupConfirm
        open={openPopupSoftDelete}
        onClose={() => setOpenPopupsoftDelete(false)}
        onCancel={handleCancelSoftDelete}
        onConfirm={handelConfirmSoftDelete}
        icon={<Warning fontSize="large" color="warning" />}
        message="Bạn có chắc chắn muốn xóa?"
        subMessage="Sau khi xoá, danh sách sẽ được chuyển vào thùng rác."
        sx={{ width: 450 }}
      />
      <PopupConfirm
        open={openPopupHardDelete}
        onClose={() => setOpenPopupHardDelete(false)}
        onCancel={handleCancelHardDelete}
        onConfirm={handleConfirmHardDelete}
        icon={<Warning fontSize="large" color="warning" />}
        message="Bạn có chắc chắn muốn xóa?"
        subMessage="Sau khi xoá danh sách sẽ biến mất vĩnh viễn!"
        sx={{ width: 450 }}
      />
    </>
  );
};

export default Approval;
