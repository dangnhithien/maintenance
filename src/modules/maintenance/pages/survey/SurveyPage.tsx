import SurveyRow from "@modules/maintenance/components/survey/SurveyRow";
import { Grid2 } from "@mui/material";

const SurveyPage = () => {
  return (
    <Grid2 container direction={"row"} spacing={2}>
      <SurveyRow />
    </Grid2>
  );
};

export default SurveyPage;
