import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

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
        setSelectedReason(""); // Reset lý do nếu "Bình thường" được chọn
      }
      setNote(""); // Reset ghi chú khi "Bình thường" được chọn/ bỏ chọn
    } else if (value === "false") {
      setCheckedFalse(!checkedFalse);
      if (checkedTrue) {
        setCheckedTrue(false);
      }
      if (!checkedFalse) {
        setNote(""); // Reset ghi chú chỉ khi chuyển từ chưa chọn sang chọn
        setSelectedReason(""); // Reset lý do khi "Bất thường" được chọn lần đầu
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
    <Paper sx={{ px: 2, py: 2 }}>
      {/* Tiêu đề: Hiển thị tên checklist */}
      <Box display="flex" alignItems="center" mb={2} pt={1}>
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          {data?.rowCheckContent}
        </Typography>
      </Box>
      {/* Phần checkbox */}
      <Box sx={{ px: 2, mb: 2 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  p: 1,
                  "& .MuiSvgIcon-root": { fontSize: 24 },
                }}
              />
            }
            label="Bình thường"
            sx={{ "& .MuiFormControlLabel-label": { fontSize: 16 } }}
            disabled
          />
          <Grid2 container direction="row" spacing={2} alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    p: 1,
                    "& .MuiSvgIcon-root": { fontSize: 24 },
                  }}
                />
              }
              label="Bất thường"
              sx={{ "& .MuiFormControlLabel-label": { fontSize: 16 } }}
              disabled
            />
            <Typography variant="body2" color="error">
              {data.errorDetailContent}
            </Typography>
          </Grid2>
        </FormGroup>
      </Box>
      {/* Phần ghi chú */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="body2">
          <strong>Ghi chú:</strong>
          <Typography component="span" variant="body2" color="textDisabled">
            {data?.note}
          </Typography>
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mt: 2 }} />
    </Paper>
  );
};

export default RowCheckValue;
