import StyledDataGrid from "@components/StyledDataGrid";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import useTemplateCheckList from "@modules/maintenance/hooks/useTemplateCheckList";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const TemplateCheckList = () => {
  const {
    templateCheckLists,
    fetchTemplateChecklists,
    error,
    loading,
    totalCount,
  } = useTemplateCheckList({
    includeProperties: "Device",
  });
  const [params, setParams] = useState<GetProductDto>({
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
    },
    {
      field: "name",
      headerName: "Tên ",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "",
      headerName: "Tên thiết bị",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.row.device?.name}</>
      ),
    },
  ];
  return (
    <>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 container justifyContent={"space-between"}>
          <InputSearch onSearch={() => {}} />
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/product/create"
          >
            <Add />
          </Button>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid columns={columns} rows={templateCheckLists} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TemplateCheckList;
