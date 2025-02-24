import PaginatedDataGrid from "@components/PaginationDatagrid";
import InputSearch from "@modules/maintenance/components/common/InputSearch";
import { GetTypeErrorDto } from "@modules/maintenance/datas/typeError/GetTypeErrorDto";
import useUser from "@modules/user/hooks/useUser";
import { Add, Warning } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";
import { Button, Divider, Grid2 } from "@mui/material";
import {
  GridColDef,
  GridDeleteIcon,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../../../maintenance/components/common/Notistack";
import PopupConfirm from "../../../maintenance/components/common/PopupConfirm";
import TrashButton from "../../../maintenance/components/common/TrashButton";

const UserList = () => {
  const [openPopupSoftDelete, setOpenPopupsoftDelete] = useState(false);
  const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false);
  const { notify } = useNotification();
  const [params, setParams] = useState<GetTypeErrorDto>({ takeCount: 5 });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const { users, deleteUser, restoreUser, error, loading, totalCount } =
    useUser(params);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "name",
      headerName: "Tên",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/user/detail/${params.row.id}`}>{params.row.fullname}</Link>
      ),
    },
    {
      field: "position",
      headerName: "Chức danh",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/user/detail/${params.row.id}`}>{params.row.position}</Link>
      ),
    },

    {
      field: "createdDate",
      headerName: "Ngày tạo",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <span>
          {params.row.createdDate &&
            new Date(params.row.createdDate).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
        </span>
      ),
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
    await deleteUser({
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
    await deleteUser({
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
    await restoreUser(rowSelectionModel as string[])
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
          <Grid2 container spacing={1}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to={"/user/create"}
              size="small"
            >
              <Add />
            </Button>
            {rowSelectionModel.length > 0 && (
              <Button
                variant="contained"
                color="error"
                onClick={params.isDeleted ? onHardDelete : onSoftDelete}
                size="small"
              >
                <GridDeleteIcon />
              </Button>
            )}
            {rowSelectionModel.length > 0 && params.isDeleted && (
              <Button
                variant="contained"
                color="primary"
                onClick={restore}
                size="small"
              >
                <RestoreIcon />
              </Button>
            )}

            <Divider draggable={false} orientation="vertical" flexItem />

            <TrashButton
              onClick={(isDeleted) =>
                setParams({ ...params, isDeleted: isDeleted })
              }
            />
          </Grid2>
        </Grid2>
        <Grid2>
          <PaginatedDataGrid
            columns={columns}
            rows={users}
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

export default UserList;
