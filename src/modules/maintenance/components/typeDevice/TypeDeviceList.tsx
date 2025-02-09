import PaginatedDataGrid from "@components/PaginationDatagrid";
import { GetTypeDeviceDto } from "@modules/maintenance/datas/typeDevice/GetTypeDeviceDto";
import useTypeDevice from "@modules/maintenance/hooks/useTypeDevice";
import { Add, Warning } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";
import { Box, Button, Divider, Grid2 } from "@mui/material";
import {
  GridColDef,
  GridDeleteIcon,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
import { useNotification } from "../common/Notistack";
import PopupConfirm from "../common/PopupConfirm";
import TrashButton from "../common/TrashButton";

const TypeDeviceList = () => {
  const [openPopupSoftDelete, setOpenPopupsoftDelete] = useState(false);
  const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false);
  const { notify } = useNotification();
  const [params, setParams] = useState<GetTypeDeviceDto>({ takeCount: 5 });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const {
    typeDevices,
    deleteTypeDevice,
    restoreTypeDevice,
    error,
    loading,
    totalCount,
  } = useTypeDevice(params);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/type-device/detail/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Tên loại thiết bị",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/type-device/detail/${params.row.id}`}>
          {params.row.name}
        </Link>
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
    await deleteTypeDevice({
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
    await deleteTypeDevice({
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
    await restoreTypeDevice(rowSelectionModel as string[])
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
              to={"/type-device/create"}
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
          <Box>
            <PaginatedDataGrid
              columns={columns}
              rows={typeDevices}
              totalCount={totalCount}
              setParams={setParams}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              loading={loading}
            />
          </Box>
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

export default TypeDeviceList;
