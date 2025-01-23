import { Theme, styled } from "@mui/material/styles";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { useState } from "react";

function customCheckbox(theme: Theme) {
  return {
    // Cấu hình checkbox (đã ẩn vì bạn chưa cần dùng)
  };
}

const StyledDataGrid = styled((props: DataGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handlePaginationChange = (newModel: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel(newModel);
  };

  return (
    <DataGrid
      {...props}
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationChange}
    />
  );
})(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",

  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#ebf1fa",
    fontSize: "16px",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#10428E",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-virtualScroller": {
    minHeight: "60px",
  },
  ...customCheckbox(theme),
}));

export default StyledDataGrid;
