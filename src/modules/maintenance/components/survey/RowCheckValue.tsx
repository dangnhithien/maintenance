import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import { Add } from "@mui/icons-material";
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
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useState } from "react";
import ErrorDetailSelect from "../common/select/ErrorDetailSelect";
interface Props {
  data: RowCheckValueDto;
}
const RowCheckValue: React.FC<Props> = ({ data }) => {
  const [checkedTrue, setCheckedTrue] = useState(false);
  const [checkedFalse, setCheckedFalse] = useState(false);
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const handleCheckboxChange = (value: string) => {
    if (value === "true") {
      setCheckedTrue(!checkedTrue);
      if (checkedFalse) {
        setCheckedFalse(false);
        setSelectedReason(""); // Reset the reason if "True" is checked
      }
      setNote(""); // Reset note when "True" is checked/unchecked
    } else if (value === "false") {
      setCheckedFalse(!checkedFalse);
      if (checkedTrue) {
        setCheckedTrue(false);
      }
      if (!checkedFalse) {
        setNote(""); // Reset note only when switching from unchecked to checked
        setSelectedReason(""); // Reset reason when "False" is first selected
      }
    }
  };

  const handleNoteChange = (event: any) => {
    setNote(event.target.value);
  };

  const handleReasonChange = (event: any) => {
    setSelectedReason(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ px: 3, marginBottom: 2 }}>
      {/* Row: Nội dung và nút xóa */}
      <Box display="flex" alignItems="center" marginBottom={1} pt={1.5}>
        <TextField
          value={data.rowCheckListName}
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
            <ErrorDetailSelect id={data.errorDetailId} />
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
          <IconButton sx={{ padding: "6px" }}>
            <Add fontSize="small" />
          </IconButton>
          <IconButton sx={{ padding: "6px" }}>
            <GridDeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default RowCheckValue;
