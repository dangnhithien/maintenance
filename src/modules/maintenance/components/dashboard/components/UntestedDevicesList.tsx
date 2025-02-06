import StyledDataGrid from "@components/StyledDataGrid";
import { GetProductDto } from "@modules/maintenance/datas/product/GetProductDto";
import useProduct from "@modules/maintenance/hooks/useProduct";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";

const UntestedDevicesList = () => {
  const [params, setParams] = useState<GetProductDto>({
    includeProperties: "Devices",
    takeCount: 20,
  });
  const { products, error, loading, totalCount } = useProduct(params);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
    {
      field: "code",
      headerName: "Mã",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.code}
        </Link>
      ),
    },

    {
      field: "",
      headerName: "Tên ",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`/task-check/detail/${params.row.id}`}>
          {params.row.divice?.name}
        </Link>
      ),
    },
  ];
  return (
    <>
      <StyledDataGrid rows={products} columns={columns} hideFooter />
    </>
  );
};

export default UntestedDevicesList;
