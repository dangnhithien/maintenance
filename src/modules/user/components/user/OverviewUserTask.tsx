import PaginatedDataGrid from "@components/PaginationDatagrid";
import InputSearch from "@modules/maintenance/components/common/InputSearch";
import { useNotification } from "@modules/maintenance/components/common/Notistack";
import { GetTaskCheckDto } from "@modules/maintenance/datas/taskCheck/GetTaskCheckDto";
import userApi from "@modules/user/apis/UserApi";
import { GetUserDto } from "@modules/user/datas/user/GetUserDto";
import { OverviewUser } from "@modules/user/datas/user/OverviewUser";
import { Box, Grid2 } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  param?: GetTaskCheckDto;
}

const OverviewUserTask: React.FC<Props> = ({ param }) => {
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState<OverviewUser[]>([]);
  const { notify } = useNotification();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [params, setParams] = useState<GetUserDto>({
    ...param,
    takeCount: 10,
    sortBy: "CreatedDate DESC",
    fromTime: firstDayOfMonth,
    toTime: lastDayOfMonth,
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    setLoading(true);
    userApi
      .getOverviewUserTask(params)
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
      field: "fullname",
      headerName: "Tên",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (cellParams: any) => (
        <Link to={`/user/detail/${cellParams.row.id}`}>
          {cellParams.row.fullname}
        </Link>
      ),
    },
    {
      field: "totalTask",
      headerName: "Số lượng task",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (cellParams: any) => (
        <Link to={`/user/detail/${cellParams.row.id}`}>
          {cellParams.row.totalTask || ""}
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

export default OverviewUserTask;
