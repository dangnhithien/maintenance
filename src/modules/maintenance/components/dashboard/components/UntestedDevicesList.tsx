import StyledDataGrid from "@components/StyledDataGrid";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import useProduct from "@modules/maintenance/hooks/useProduct";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";

const UntestedDevicesList = () => {
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "Device",
    takeCount: 10,
  });
  const { products, error, loading, totalCount } = useProduct(params);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "serialNumber",
      headerName: "Seri",
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
      field: "name",
      headerName: "Tên ",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/product/detail/${params.row.id}`}>{params.row.name}</Link>
      ),
    },
  ];
  return (
    <>
      <StyledDataGrid
        rows={products}
        columns={columns}
        hideFooter
        sx={{ height: 400 }}
      />
    </>
  );
};

export default UntestedDevicesList;
