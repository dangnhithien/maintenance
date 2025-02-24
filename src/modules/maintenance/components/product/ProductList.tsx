import PaginatedDataGrid from "@components/PaginationDatagrid";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import useProduct from "@modules/maintenance/hooks/useProduct";
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
import InputSearch from "../common/InputSearch";
import { useNotification } from "../common/Notistack";
import PopupConfirm from "../common/PopupConfirm";
import TrashButton from "../common/TrashButton";
interface Props {
  isPage?: boolean;
  param?: GetProductDto;
}
const ProductList: React.FC<Props> = ({ param, isPage = true }) => {
  const [openPopupSoftDelete, setOpenPopupsoftDelete] = useState(false);
  const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false);
  const { notify } = useNotification();
  const [params, setParams] = useState<GetProductDto>({
    ...param,
    includeProperties: "Device",
    takeCount: 5,
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const {
    products,
    deleteProduct,
    restoreProduct,
    error,
    loading,
    totalCount,
  } = useProduct(params);

  const columns: GridColDef<ProductDto>[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "serialNumber",
      headerName: "Seri",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/product/detail/${params.row.id}`}>
          {params.row.serialNumber}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Tên",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/product/detail/${params.row.id}`}>{params.row.name}</Link>
      ),
    },

    {
      field: "createdDate",
      headerName: "Ngày tạo",

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
    await deleteProduct({
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
    await deleteProduct({
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
    await restoreProduct(rowSelectionModel as string[])
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
          {isPage && (
            <Grid2 container spacing={1}>
              <Button
                variant="contained"
                color="success"
                component={Link}
                to={"/product/create"}
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
          )}
        </Grid2>
        <Grid2>
          <PaginatedDataGrid
            columns={columns}
            rows={products}
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

export default ProductList;
