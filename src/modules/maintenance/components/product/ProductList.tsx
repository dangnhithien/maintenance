import StyledDataGrid from "@components/StyledDataGrid";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import useProduct from "@modules/maintenance/hooks/useProduct";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const ProductList = () => {
  const {
    products,
    fetchProducts: fetchDevices,
    error,
    loading,
    totalCount,
  } = useProduct({
    includeProperties: "Device",
  });
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "Device",
  });
  useEffect(() => {
    fetchDevices(params);
  }, [params]);
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "serialNumber",
      headerName: "Số seri",
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
      field: "deviceCode",
      headerName: "Mã thịết bị",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/product/detail/${params.row.id}`}>
          {params.row.deviceCode}
        </Link>
      ),
    },
    {
      field: "device.name",
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
          <InputSearch
            onSearch={(searchText) => {
              setParams({ ...params, searchTerm: searchText });
            }}
          />
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
            <StyledDataGrid columns={columns} rows={products} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ProductList;
