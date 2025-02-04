import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TypeErrorSelect from "../common/select/TypeErrorSelect";

// Row Component – hiển thị dạng card, không có số thứ tự
interface RowProps {
  index: number;
  row: CreateRowCheckListDto;
  onInputChange: (
    index: number,
    field: keyof CreateRowCheckListDto,
    value: string
  ) => void;
  onDelete: (index: number) => void;
  onAdd: (index: number) => void;
}

const Row: React.FC<RowProps> = ({
  index,
  row,
  onInputChange,
  onDelete,
  onAdd,
}) => {
  return (
    <Paper elevation={3} sx={{ px: 3, marginBottom: 2 }}>
      {/* Row: Nội dung và nút xóa */}
      <Box display="flex" alignItems="center" marginBottom={1} pt={1.5}>
        <TextField
          value={row.name}
          onChange={(e) => onInputChange(index, "name", e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
          color="primary"
          placeholder="Nhiệt độ máy hiện tại đang như thế nào( nhiệt độ bình thường? độ C)?"
          inputProps={{
            style: {
              fontSize: 14,
              paddingTop: 8,
              paddingBottom: 8,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": {
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            },
          }}
        />
      </Box>
      <Box sx={{ px: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  padding: "6px",
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
            }
            label="Bình thường"
            sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
          />
          <Grid2 container direction={"row"} spacing={1} alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    padding: "6px",
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              }
              label="Bất thường"
              sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
            />
            <TypeErrorSelect
              id={row.typeErrorId}
              onChange={(val) =>
                onInputChange(index, "typeErrorId", val?.id || "")
              }
            />
          </Grid2>
        </FormGroup>
      </Box>
      <Divider sx={{ width: "100%", mt: 1.5 }} />
      <Box
        display="flex"
        alignItems="center"
        marginBottom={1}
        justifyContent={"flex-end"}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => onAdd(index)} sx={{ padding: "6px" }}>
            <Add fontSize="small" />
          </IconButton>
          <IconButton onClick={() => onDelete(index)} sx={{ padding: "6px" }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

interface Props {
  rowCheckLists: CreateRowCheckListDto[];
  onChange?: (value: CreateRowCheckListDto[]) => void;
}

// Component chính sử dụng giao diện dạng form
const DynamicForm: React.FC<Props> = ({ rowCheckLists, onChange }) => {
  const [rows, setRows] = useState<CreateRowCheckListDto[]>(rowCheckLists);

  useEffect(() => {
    setRows(rowCheckLists);
  }, [rowCheckLists]);

  // Cập nhật giá trị của các trường trong card
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

  // Xóa một card
  const handleDelete = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onChange) onChange(updatedRows);
  };

  // Thêm một card mới ngay sau card có chỉ số index
  const handleAddRowAt = (index: number) => {
    const newRow: CreateRowCheckListDto = {
      name: "",
      typeErrorId: "",
      code: "",
      templateCheckListId: "",
    };

    let newRows: CreateRowCheckListDto[] = [];
    if (rows.length === 0) {
      newRows = [newRow];
    } else {
      newRows = [...rows];
      newRows.splice(index + 1, 0, newRow);
    }
    setRows(newRows);
    if (onChange) onChange(newRows);
  };

  return (
    <Container>
      <Box>
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <Row
              key={index}
              index={index}
              row={row}
              onInputChange={handleInputChange}
              onDelete={handleDelete}
              onAdd={handleAddRowAt}
            />
          ))
        ) : (
          // Nếu chưa có card nào, hiển thị nút thêm chung
          <Button
            variant="contained"
            onClick={() => handleAddRowAt(-1)}
            startIcon={<Add />}
          >
            Thêm
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default DynamicForm;
