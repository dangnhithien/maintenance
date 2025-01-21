import StyledDataGrid from "@components/StyledDataGrid";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import useProduct from "@modules/maintenance/hooks/useProduct";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import InputSearch from "../common/InputSearch";

const ProductList = () => {
  const {
    products,
    fetchProducts: fetchDevices,
    error,
    loading,
    totalCount,
  } = useProduct({
    includeProperties: "TypeDevice",
  });
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "TypeDevice",
  });
  useEffect(() => {
    fetchDevices(params);
  }, [params]);
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "serialNumber",
      headerName: "Mã thiết bị",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "#",
      headerName: "Tên thiết bị",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.row.typeDevice?.name}</>
      ),
    },
    {
      field: "#",
      headerName: "Loại thiết bị ",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.row.typeDevice?.name}</>
      ),
    },
  ];
  return (
    <>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 container justifyContent={"space-between"}>
          <InputSearch onSearch={() => {}} />
          <Button variant="contained" color="success">
            <Add />
          </Button>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid columns={columns} row={products} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ProductList;
