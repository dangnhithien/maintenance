import { CircularProgress, Stack } from "@mui/material";
import { FC } from "react";

interface SpinnerLoadingProps {}

const SpinnerLoading: FC<SpinnerLoadingProps> = () => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <CircularProgress />
      </Stack>
    </>
  );
};

export default SpinnerLoading;
