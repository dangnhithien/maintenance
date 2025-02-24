import PaginatedDataGrid from "@components/PaginationDatagrid";
import productApi from "@modules/maintenance/apis/productApi";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import { ProductDto } from "@modules/maintenance/datas/product/ProductDto";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import { Box, Grid2 } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
import { useNotification } from "../common/Notistack";

interface Props {
  param?: GetTaskCheckDto;
}

const MaintenanceReminder: React.FC<Props> = ({ param }) => {
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const { notify } = useNotification();
  const [params, setParams] = useState<GetProductDto>({
    ...param,
    includeProperties: "TemplateCheck",
    takeCount: 5,
    sortBy: "CreatedDate DESC",
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    setLoading(true);
    productApi
      .getMaintenanceReminder(params)
      .then((data) => {
        // Giả sử data trả về có cấu trúc { products: ProductDto[], totalCount: number }
        setProducts(data.result.items || []);
        setTotalCount(data.result.totalCount || 0);
      })
      .catch((error) => {
        notify("Có lỗi xảy ra khi lấy dữ liệu", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (cellParams: any) => (
        <Link to={`/task-check/detail/${cellParams.row.id}`}>
          {cellParams.row.code}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Tên thiết bị",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (cellParams: any) => (
        <Link to={`/product/detail/${cellParams.row.id}`}>
          {cellParams.row.templateCheck?.name || ""}
        </Link>
      ),
    },
    {
      field: "checkTime",
      headerName: "Ngày bảo trì kế tiếp",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (cellParams: any) => (
        <Link to={`/product/detail/${cellParams.row.id}`}>
          {cellParams.nextMaintenanceReminder
            ? new Date(
                cellParams.row.nextMaintenanceReminder
              ).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
            : ""}
        </Link>
      ),
    },
  ];

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2 container justifyContent="space-between">
        <InputSearch
          onSearch={(searchText) => {
            setParams({ ...params, searchTerm: searchText });
          }}
        />
      </Grid2>
      <Grid2>
        <Box>
          <PaginatedDataGrid
            columns={columns}
            rows={products}
            totalCount={totalCount}
            setParams={setParams}
            onRowSelectionModelChange={(newRowSelectionModel) =>
              setRowSelectionModel(newRowSelectionModel)
            }
            loading={loading}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default MaintenanceReminder;
