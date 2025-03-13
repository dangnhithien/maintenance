import StyledDataGrid from "@components/StyledDataGrid";
import StyledPagination from "@components/StyledPagination";
import { PaginationItem } from "@mui/material";
import { DataGridProps, GridColDef } from "@mui/x-data-grid";
import { useCallback, useState } from "react";

interface PaginatedDataGridProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
  totalCount: number;
  setParams: (params: any) => void;
}

const PaginatedDataGrid = ({
  columns,
  rows,
  totalCount,
  setParams,
  ...dataGridProps
}: PaginatedDataGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 0,
  });

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      console.log(page);
      setPaginationModel((prev) => ({
        ...prev,
        page: page - 1, // Chuyển từ base 1 sang base 0
      }));
      setParams((prev: any) => ({
        ...prev,
        skipCount: (page - 1) * paginationModel.pageSize,
      }));
    },
    [paginationModel.pageSize, setParams]
  );

  const PaginationComponent = useCallback(() => {
    const pageCount = Math.ceil(totalCount / paginationModel.pageSize);
    if (pageCount <= 0) return null;

    return (
      <StyledPagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={paginationModel.page + 1}
        showFirstButton
        showLastButton
        siblingCount={0}
        boundaryCount={1}
        count={pageCount}
        renderItem={(props) => <PaginationItem {...props} />}
        onChange={handlePageChange}
      />
    );
  }, [totalCount, paginationModel, handlePageChange]);

  return (
    <StyledDataGrid
      columns={columns}
      rows={rows}
      rowCount={totalCount}
      paginationModel={paginationModel}
      pageSizeOptions={[6, 12, 18]}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnMenu
      paginationMode="server"
      slots={{
        pagination: PaginationComponent,
      }}
      {...dataGridProps}
    />
  );
};

export default PaginatedDataGrid;
