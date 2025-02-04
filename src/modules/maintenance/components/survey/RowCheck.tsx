import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ErrorDetailSelect from "../common/select/ErrorDetailSelect";

interface Props {
  data: CreateRowCheckListDto;
}

const RowCheck: React.FC<Props> = ({ data }) => {
  const [checkedTrue, setCheckedTrue] = useState(false);
  const [checkedFalse, setCheckedFalse] = useState(false);
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [radioError, setRadioError] = useState(false);
  const [title, setTitle] = useState(data.name);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setRadioError(!checkedTrue && !checkedFalse);
  }, [checkedTrue, checkedFalse]);

  const handleCheckboxChange = (value: string) => {
    if (value === "true") {
      setCheckedTrue(true);
      setCheckedFalse(false);
      setNote("");
      setSelectedReason("");
    } else {
      setCheckedTrue(false);
      setCheckedFalse(true);
    }
  };

  const validateTitle = () => {
    setTitleError(title.trim() === "");
  };

  return (
    <Box
      sx={{ mb: 3, p: 2, border: 1, borderColor: "#e0e0e0", borderRadius: 1 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Question Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={validateTitle}
        error={titleError}
        helperText={titleError && "Title is required"}
        required
        sx={{ mb: 2 }}
      />

      <FormControl
        component="fieldset"
        required
        error={radioError}
        fullWidth
        sx={{ mb: 2 }}
      >
        <RadioGroup
          row
          aria-label="status"
          name="status"
          value={checkedTrue ? "true" : checkedFalse ? "false" : ""}
          onChange={(e) => handleCheckboxChange(e.target.value)}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Đã kiểm tra"
            sx={{ mr: 3 }}
          />
          <FormControlLabel value="false" control={<Radio />} label="Lỗi" />
        </RadioGroup>
        {radioError && (
          <FormHelperText sx={{ ml: 0 }}>
            Please select an option
          </FormHelperText>
        )}
      </FormControl>

      {checkedFalse && (
        <>
          <ErrorDetailSelect />

          <TextField
            fullWidth
            variant="outlined"
            label="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
            error={!note}
            helperText={!note && "Note is required when error is selected"}
            multiline
            rows={2}
          />
        </>
      )}
    </Box>
  );
};

export default RowCheck;
