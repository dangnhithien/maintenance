import PaginatedDataGrid from "@components/PaginationDatagrid";
import { GetTemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/GetTemplateCheckListDto";
import useTemplateCheckList from "@modules/maintenance/hooks/useTemplateCheckList";
import { Add } from "@mui/icons-material";
import { Button, Divider, Grid2, Paper } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
interface Props {
  deviceId?: string;
}
const TemplateCheckList: React.FC<Props> = ({ deviceId }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const {
    templateCheckLists,
    fetchTemplateChecklists,
    error,
    loading,
    totalCount,
  } = useTemplateCheckList({
    deviceId: deviceId,
    includeProperties: "Device",
  });
  const [params, setParams] = useState<GetTemplateCheckListDto>({
    deviceId: deviceId,
    includeProperties: "Device",
  });
  useEffect(() => {
    fetchTemplateChecklists(params);
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
        <Link to={`/template-check-list/create/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Tên biểu mẫu ",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/template-check-list/create/${params.row.id}`}>
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "",
      headerName: "Thiết bị",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/template-check-list/create/${params.row.id}`}>
          {params.row.device?.name}
        </Link>
      ),
    },
    {
      field: "date",
      headerName: "Ngày tạo",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
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
          <Grid2 container spacing={1}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to={"/template-check-list/create/device/" + deviceId}
              size="small"
            >
              <Add />
            </Button>

            <Divider draggable={false} orientation="vertical" flexItem />

            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/template-check-list/create/device/" + deviceId}
              size="small"
              endIcon={<GridDeleteIcon />}
            >
              Thùng rác
            </Button>
          </Grid2>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <PaginatedDataGrid
              columns={columns}
              rows={templateCheckLists}
              totalCount={totalCount}
              paginationModel={paginationModel}
              onPageChange={(newPage) => {
                setPaginationModel((prev) => ({
                  ...prev,
                  page: newPage,
                }));
                setParams((prev) => ({
                  ...prev,
                  skipCount: newPage * paginationModel.pageSize,
                }));
              }}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TemplateCheckList;
