import StyledDataGrid from "@components/StyledDataGrid";
import { GetDeviceDto } from "@modules/maintenance/datas/device/GetDeviceDto";
import useDevices from "@modules/maintenance/hooks/useDevice";
import { Add } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const DeviceList = () => {
  const { devices, fetchDevices, error, loading, totalCount } = useDevices({
    includeProperties: "TypeDevice",
  });
  const [params, setParams] = useState<GetDeviceDto>({
    includeProperties: "TypeDevice",
  });
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã thiết bị",

      editable: false,
      sortable: false,
      renderCell: (params: any) => (
        <Link to={`/device/detail/${params.row.id}`}>{params.row.code}</Link>
      ),
    },
    {
      field: "name",
      headerName: "Tên thiết bị",

      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/device/detail/${params.row.id}`}>{params.row.name}</Link>
      ),
    },
    {
      field: "typeDevice",
      headerName: "Loại thiết bị",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.row.typeDevice?.name}</>
      ),
    },
  ];
  useEffect(() => {
    fetchDevices(params);
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
          <Button
            variant="contained"
            color="success"
            component={Link} // Kết hợp Button với Link từ react-router-dom
            to="/device/create" // Đường dẫn liên kết
            size="small"
          >
            <Add />
          </Button>
        </Grid2>
        <Grid2>
          <Paper sx={{ p: 2 }}>
            <StyledDataGrid
              columns={columns}
              rows={devices}
              rowSelection={false}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default DeviceList;
