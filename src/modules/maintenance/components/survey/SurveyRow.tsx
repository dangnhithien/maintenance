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
  return (
    <Grid2 size={6} container direction={"row"}>
      <Grid2 container justifyItems={"center"} alignItems={"center"}>
        <Grid2>
          <Typography variant="h4">1</Typography>
        </Grid2>
      </Grid2>
      <Grid2 flexGrow={1} container direction={"column"}>
        <Grid2
          size={12}
          container
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          </Typography>
          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={() => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <TextField label="Filled" variant="outlined" fullWidth />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default SurveyRow;
