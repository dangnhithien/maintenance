import StyledDataGrid from "@components/StyledDataGrid";
import StyledPagination from "@components/StyledPagination";
import { PaginationItem } from "@mui/material";
import { DataGridProps, GridColDef } from "@mui/x-data-grid";
import { useCallback } from "react";

interface PaginatedDataGridProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
  totalCount: number;
  paginationModel: { page: number; pageSize: number };
  onPageChange: (newPage: number) => void;
}

const PaginatedDataGrid = ({
  columns,
  rows,
  totalCount,
  paginationModel,
  onPageChange,
  ...dataGridProps
}: PaginatedDataGridProps) => {
  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      onPageChange(page - 1); // Chuyển từ base 1 sang base 0
    },
    [onPageChange]
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
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnMenu
      slots={{
        pagination: PaginationComponent,
      }}
      {...dataGridProps}
    />
  );
};

export default PaginatedDataGrid;
