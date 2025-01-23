import StyledDataGrid from "@components/StyledDataGrid";
import { GetTemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/GetTemplateCheckListDto";
import useTemplateCheckList from "@modules/maintenance/hooks/useTemplateCheckList";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
interface Props {
  deviceId?: string;
}
const TemplateCheckList: React.FC<Props> = ({ deviceId }) => {
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
      headerName: "Tên ",
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
      headerName: "Tên thiết bị",
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
          <Button
            variant="contained"
            color="success"
            component={Link}
            to={"/template-check-list/create/device/" + deviceId}
          >
            <Add />
          </Button>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid
              columns={columns}
              rows={templateCheckLists}
              rowCount={templateCheckLists.length}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TemplateCheckList;
