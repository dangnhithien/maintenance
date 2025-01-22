import StyledDataGrid from "@components/StyledDataGrid";
import { GetSolutionOptionDto } from "@modules/maintenance/datas/solutionOption/GetSolutionOptionDto";
import useSolutionOptions from "@modules/maintenance/hooks/useSolutionOption";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const SolutionOptionList = () => {
  const { solutionOptions, fetchSolutionOptions, error, loading, totalCount } =
    useSolutionOptions({
      includeProperties: "ErrorDetail",
    });
  const [params, setParams] = useState<GetSolutionOptionDto>({
    includeProperties: "ErrorDetail",
  });
  useEffect(() => {
    fetchSolutionOptions(params);
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
      field: "name",
      headerName: "Tên",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Mô tả",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "",
      headerName: "Mô tả",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.row.errorDetail?.name}</>
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
            to="/solution-option/create"
          >
            <Add />
          </Button>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid columns={columns} rows={solutionOptions} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default SolutionOptionList;
