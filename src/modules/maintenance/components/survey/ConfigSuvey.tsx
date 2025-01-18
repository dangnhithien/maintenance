import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';

// Define data type for rows
interface DataRow {
  id: number;
  name: string;
  errorType: string; // Updated field name
}

// Initial sample data
const initialData: DataRow[] = [
  { id: 1, name: 'Lỗi cú pháp', errorType: 'Cú pháp' },
  { id: 2, name: 'Thiếu tham số', errorType: 'Tham số' },
  { id: 3, name: 'Lỗi định dạng', errorType: 'Định dạng' },
];

// Row Component
interface RowProps {
  row: DataRow;
  onInputChange: (id: number, field: keyof DataRow, value: string) => void;
  onDelete: (id: number) => void;
}

const Row: React.FC<RowProps> = ({ row, onInputChange, onDelete }) => {
  return (
    <TableRow>
      <TableCell style={{ width: '50px' }}>{row.id}</TableCell>
      <TableCell>
        <TextField
          value={row.name}
          onChange={(e) => onInputChange(row.id, 'name', e.target.value)}
          variant="outlined"
          size="small"
          style={{ width: '100%' }}
        />
      </TableCell>
      <TableCell>
        <Select
          value={row.errorType}
          onChange={(e) => onInputChange(row.id, 'errorType', e.target.value)}
          variant="outlined"
          size="small"
          style={{ width: '100%' }}
        >
          <MenuItem value="Cú pháp">Cú pháp</MenuItem>
          <MenuItem value="Tham số">Tham số</MenuItem>
          <MenuItem value="Định dạng">Định dạng</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <IconButton color="secondary" onClick={() => onDelete(row.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

// Main Table Component
const DynamicTable: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>(initialData);
  const [sortConfig, setSortConfig] = useState<{ key: keyof DataRow; direction: 'asc' | 'desc' } | null>(
    null
  );

  const handleSort = (key: keyof DataRow) => {
    const isAsc = sortConfig?.key === key && sortConfig.direction === 'asc';
    const direction = isAsc ? 'desc' : 'asc';

    const sortedRows = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setRows(sortedRows);
    setSortConfig({ key, direction });
  };

  const handleInputChange = (id: number, field: keyof DataRow, value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['STT', 'Nội dung', 'Loại lỗi', 'Thao tác'].map((key, index) => (
                <TableCell
                  key={key}
                  style={index === 0 ? { width: '50px' } : undefined} // Giảm chiều rộng cột STT
                >
                  {key !== 'Thao tác' ? (
                    <TableSortLabel
                      active={sortConfig?.key === key.toLowerCase()}
                      direction={
                        sortConfig?.key === key.toLowerCase()
                          ? sortConfig.direction
                          : 'asc'
                      }
                      onClick={() => handleSort(key.toLowerCase() as keyof DataRow)}
                    >
                      {key}
                    </TableSortLabel>
                  ) : (
                    key
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.id}
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
        color="primary"
        style={{ marginTop: '16px' }}
        onClick={() =>
          setRows([
            ...rows,
            { id: rows.length + 1, name: 'Lỗi mới', errorType: 'Cú pháp' },
          ])
        }
      >
        Thêm dòng
      </Button>
    </Paper>
  );
};

export default DynamicTable;
