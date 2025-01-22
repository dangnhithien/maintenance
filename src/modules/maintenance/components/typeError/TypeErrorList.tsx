import StyledDataGrid from "@components/StyledDataGrid";
import { GetTypeErrorDto } from "@modules/maintenance/datas/typeError/GetTypeErrorDto";
import useTypeError from "@modules/maintenance/hooks/useTypeError";
import { Add, Download, Upload } from "@mui/icons-material";
import { Button, Grid2, Paper, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const TypeErrorList = () => {
  const { typeErrors, fetchTypeErrors, error, loading, totalCount } =
    useTypeError();
  const [params, setParams] = useState<GetTypeErrorDto>();
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã loại thiết bị",
      flex: 1,
      editable: false,
      sortable: false,
      renderCell: (params: any) => (
        <Link to={`/type-error/detail/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Tên loại thiết bị ",
      flex: 1,
      editable: false,

      sortable: false,
      renderCell: (params: any) => (
        <Link to={`/type-error/detail/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },
  ];
  useEffect(() => {
    fetchTypeErrors(params);
  }, [params]);

  return (
    <>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 container justifyContent={"space-between"}>
          <InputSearch
            onSearch={(searchText) => {
              setParams({ ...params, searchTerm: searchText });
            }}
          />
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="contained"
              color="success"
              component={Link} // Kết hợp Button với Link từ react-router-dom
              to="/type-error/create" // Đường dẫn liên kết
              size="small"
            >
              <Add />
            </Button>
            <Button variant="contained" color="success" size="small">
              <Upload />
            </Button>
            <Button variant="contained" color="success" size="small">
              <Download />
            </Button>
          </Stack>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid
              columns={columns}
              rows={typeErrors}
              rowSelection={false}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TypeErrorList;
