import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const SurveyRow = () => {
  const [age, setAge] = React.useState("");

  const handleAgeChange = (event:any) => {
    setAge(event.target.value);
  };

  return (
    <Grid2
      container
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        padding: 2,
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Question Number */}
      <Grid2 size={1}>
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="bold"
          sx={{ color: "#333" }}
        >
          1
        </Typography>
      </Grid2>

      {/* Question Text */}
      <Grid2 size={6}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: "#555",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
        </Typography>
      </Grid2>

      {/* Dropdown */}
      <Grid2 size={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="select-label">Age</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={age}
            label="Age"
            onChange={handleAgeChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      {/* Text Input */}
      <Grid2 size={3}>
        <TextField
          label="Your Answer"
          variant="outlined"
          fullWidth
          size="small"
        />
      </Grid2>
    </Grid2>
  );
};

export default SurveyRow;
