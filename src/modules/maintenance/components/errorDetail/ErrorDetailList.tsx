import StyledDataGrid from "@components/StyledDataGrid";
import { GetErrorDetailDto } from "@modules/maintenance/datas/errorDetail/GetErrorDetailDto";
import useErrorDetail from "@modules/maintenance/hooks/useErrorDetail";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const ErrorDetailList = () => {
  const { errorDetails, fetchErrorDetails, error, loading, totalCount } =
    useErrorDetail({
      includeProperties: "TypeError",
    });
  const [params, setParams] = useState<GetErrorDetailDto>({
    includeProperties: "TypeError",
  });
  useEffect(() => {
    fetchErrorDetails(params);
  }, [params]);
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "content",
      headerName: "Lỗi",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "typeError.name",
      headerName: "Loại lỗi",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.row.typeError?.name}</>
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
            to="/error-detail/create"
          >
            <Add />
          </Button>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid columns={columns} rows={errorDetails} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ErrorDetailList;
