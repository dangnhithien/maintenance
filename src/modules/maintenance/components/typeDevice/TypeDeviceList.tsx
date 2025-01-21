import StyledDataGrid from "@components/StyledDataGrid";
import { GetTypeDeviceDto } from "@modules/maintenance/datas/typeDevice/GetTypeDeviceDto";
import useTypeDevices from "@modules/maintenance/hooks/useTypeDevice";
import { Add, Download, Upload } from "@mui/icons-material";
import { Button, Grid2, Paper, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";

const TypeDeviceList = () => {
  const {
    typeDevices: devices,
    fetchTypeDevices,
    error,
    loading,
    totalCount,
  } = useTypeDevices();
  const [params, setParams] = useState<GetTypeDeviceDto>({
    includeProperties: "TypeDevice",
  });
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã loại thiết bị",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Tên loại thiết bị ",
      minWidth: 300,
      editable: false,
      sortable: false,
      flex: 1,
    },
  ];
  useEffect(() => {
    fetchTypeDevices(params);
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
              to="/type-device/create" // Đường dẫn liên kết
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
            <StyledDataGrid columns={columns} rows={devices} />
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default TypeDeviceList;
