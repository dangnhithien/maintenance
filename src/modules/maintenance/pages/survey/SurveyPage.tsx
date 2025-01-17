import Survey from "@modules/maintenance/components/survey/Survey";
import { Grid2 } from "@mui/material";

const SurveyPage = () => {
  return (
    <Grid2 container direction={"row"} spacing={2}>
      <Survey />
    </Grid2>
  );
};

export default SurveyPage;
