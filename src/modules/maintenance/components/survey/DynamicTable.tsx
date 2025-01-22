import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TypeErrorSelect from "../common/select/TypeErrorSelect";

// Initial sample data
const initialData: CreateRowCheckListDto[] = [];

// Row Component
interface RowProps {
  index: number;
  row: CreateRowCheckListDto;
  onInputChange: (
    index: number,
    field: keyof CreateRowCheckListDto,
    value: string
  ) => void;
  onDelete: (index: number) => void;
}

const Row: React.FC<RowProps> = ({ index, row, onInputChange, onDelete }) => {
  return (
    <TableRow>
      <TableCell style={{ width: "50px" }}>{index + 1}</TableCell>
      <TableCell>
        <TextField
          value={row.name}
          onChange={(e) => onInputChange(index, "name", e.target.value)}
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
        />
      </TableCell>
      <TableCell>
        <TypeErrorSelect
          id={row.typeErrorId}
          onChange={(val) => onInputChange(index, "typeErrorId", val?.id || "")}
        />
      </TableCell>
      <TableCell>
        <IconButton color="error" onClick={() => onDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

interface Props {
  rowCheckLists: CreateRowCheckListDto[];
  onChange?: (value: CreateRowCheckListDto[]) => void;
}

// Main Table Component
const DynamicTable: React.FC<Props> = ({ rowCheckLists, onChange }) => {
  const [rows, setRows] = useState<CreateRowCheckListDto[]>(rowCheckLists);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CreateRowCheckListDto;
    direction: "asc" | "desc";
  } | null>(null);
  useEffect(() => {
    setRows(rowCheckLists);
  }, [rowCheckLists]);

  const handleSort = (key: keyof CreateRowCheckListDto) => {
    const isAsc = sortConfig?.key === key && sortConfig.direction === "asc";
    const direction = isAsc ? "desc" : "asc";

    // const sortedRows = [...rows].sort((a, b) => {
    //   if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    //   if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    //   return 0;
    // });

    // setRows(sortedRows);
    setSortConfig({ key, direction });
  };

  const handleInputChange = (
    index: number,
    field: keyof CreateRowCheckListDto,
    value: string
  ) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    if (onChange) onChange(updatedRows);
  };

  const handleDelete = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onChange) onChange(updatedRows);
  };

  const handleAddRow = () => {
    const newRow: CreateRowCheckListDto = {
      name: "",
      typeErrorId: "",
      code: "",
      templateCheckListId: "",
    };
    const newRows = [...rows, newRow];
    setRows(newRows);
    if (onChange) onChange(newRows);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { key: "index", label: "STT" },
                { key: "name", label: "Nội dung" },
                { key: "typeErrorId", label: "Loại lỗi" },
                { key: "actions", label: "Thao tác" },
              ].map(({ key, label }) => (
                <TableCell
                  key={key}
                  style={key === "index" ? { width: "50px" } : undefined}
                >
                  {key !== "actions" ? (
                    <TableSortLabel
                      active={sortConfig?.key === key}
                      direction={
                        sortConfig?.key === key ? sortConfig.direction : "asc"
                      }
                      onClick={() =>
                        handleSort(key as keyof CreateRowCheckListDto)
                      }
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row
                key={index}
                index={index}
                row={row}
                onInputChange={handleInputChange}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="success"
        style={{ marginTop: "16px" }}
        onClick={handleAddRow}
        startIcon={<Add />}
      >
        Thêm
      </Button>
    </>
  );
};

export default DynamicTable;
