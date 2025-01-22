import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  TextField,
} from "@mui/material";
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
    <Paper elevation={2} sx={{ width: "100%", pt: 3, pb: 4, px: 4 }}>
      <FormControl component="fieldset" style={{ width: "100%" }}>
        <FormLabel sx={{ fontWeight: "bold" }}>
          {data.rowCheckListName}
        </FormLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "8px",
          }}
        >
          <FormControlLabel
            control={
              <Radio
                checked={!data.errorDetailId}
                // onChange={() => handleCheckboxChange("true")}
              />
            }
            label="Đã kiểm tra"
          />
          <FormControlLabel
            control={
              <Radio
                checked={!!data.errorDetailId}
                // onChange={() => handleCheckboxChange("false")}
              />
            }
            label="Lỗi"
          />
          {!!data.errorDetailId && (
            <ErrorDetailSelect id={data.errorDetailId} isDisabled={true} />
          )}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <FormLabel
            style={{ marginRight: "8px", width: 80, marginBottom: "-5px" }}
          >
            Ghi chú
          </FormLabel>
          <TextField
            variant="standard"
            fullWidth
            value={note}
            onChange={handleNoteChange}
            disabled={true}
          />
        </div>
      </FormControl>
    </Paper>
  );
};

export default RowCheckValue;
