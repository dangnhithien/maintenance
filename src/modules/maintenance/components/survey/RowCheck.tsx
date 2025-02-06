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
  row: CreateRowCheckListDto;
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
    <Paper elevation={3} sx={{ px: 3, marginBottom: 2 }}>
      {/* Row: Nội dung và nút xóa */}
      <Box
        display="flex"
        alignItems="center"
        marginBottom={1}
        pt={1.5}
        justifyContent={"space-between"}
      >
        <TextField
          value={row.content || ""}
          onChange={(e) => onInputChange(index, "content", e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
          color="primary"
          placeholder="Nhập câu hỏi khảo sát ..."
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
        <Box minWidth={150} ml={2}>
          <TypeErrorSelect
            id={row.typeErrorId}
            onChange={(val) =>
              onInputChange(index, "typeErrorId", val?.id || "")
            }
          />
        </Box>
      </Box>
      <Box sx={{ px: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  padding: "6px",
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
            }
            label="Bình thường"
            disabled
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
              disabled
              sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
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
            <Add fontSize="medium" />
          </IconButton>
          <IconButton onClick={() => onDelete(index)} sx={{ padding: "6px" }}>
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
export default RowCheck;
