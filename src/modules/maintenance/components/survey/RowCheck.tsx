import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";

import React from "react";
import TypeErrorSelect from "../common/select/TypeErrorSelect";

// Row Component – hiển thị dạng card, không có số thứ tự
interface RowProps {
  index: number;
  row: CreateRowCheckListDto; // Sử dụng interface mới
  // Tham số field kiểu "keyof CreateRowCheckListDto" để đảm bảo an toàn
  onInputChange: (
    index: number,
    field: keyof CreateRowCheckListDto,
    value: string
  ) => void;
  onDelete: (index: number) => void;
  onAdd: (index: number) => void;
}

const RowCheck: React.FC<RowProps> = ({
  index,
  row,
  onInputChange,
  onDelete,
  onAdd,
}) => {
  return (
    <Paper variant="outlined" sx={{ px: 3, mb: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={1}
      >
        <TextField
          placeholder="Nhập câu hỏi khảo sát ..."
          value={row.content || ""}
          onChange={(e) => onInputChange(index, "content", e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
          color="primary"
          sx={{
            // Ẩn border MUI cho gọn, tuỳ ý
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": {
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            },
          }}
        />
        <Box minWidth={150} ml={2}>
          <TypeErrorSelect
            // Dữ liệu theo interface
            id={row.typeErrorId}
            onChange={(val) =>
              onInputChange(index, "typeErrorId", val?.id || "")
            }
          />
        </Box>
      </Box>

      {/* Row 3: Các checkbox minh hoạ "Bình thường / Bất thường" */}
      <Box sx={{ px: 3, mt: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  p: "6px",
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
            }
            label="Bình thường"
            disabled
            sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
          />
          <Grid2 container direction="row" spacing={1} alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    p: "6px",
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              }
              label="Bất thường"
              disabled
              sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
            />
          </Grid2>
        </FormGroup>
      </Box>

      {/* Tuỳ chọn: nếu muốn hiển thị dropdownValues, note,... thì code thêm */}
      {/* Row 4: Ghi chú, dropdownValues,... (VD) */}
      {/* 
      <Box mt={1}>
        <TextField
          label="Note"
          value={row.note || ""}
          onChange={(e) => onInputChange(index, "note", e.target.value)}
          variant="outlined"
          size="small"
          multiline
          fullWidth
        />
      </Box>
      */}

      <Divider sx={{ width: "100%", mt: 2 }} />
      {/* Row 5: Nút thêm/xoá */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" py={1}>
        <IconButton onClick={() => onAdd(index)} sx={{ p: "6px" }}>
          <Add fontSize="medium" />
        </IconButton>
        <IconButton onClick={() => onDelete(index)} sx={{ p: "6px" }}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default RowCheck;
