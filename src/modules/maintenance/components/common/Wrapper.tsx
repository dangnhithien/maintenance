import { Theme } from "@emotion/react";
import { Box, Paper, SxProps, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface Props {
  title?: string;
  subtitle?: string; // Thêm phụ đề tùy chọn
  actions?: React.ReactNode; // Thêm khu vực hành động (nút hoặc link)
  sx?: SxProps<Theme>;
}

const Wrapper: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
  sx,
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        width: "100%",
        height: "100%",

        ...sx,
        overflowX: "auto",
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {title && (
          <Box>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              fontSize={18}
            >
              {title}
            </Typography>
          </Box>
        )}
      </Box>
      <Box>{children}</Box>
    </Paper>
  );
};

export default Wrapper;
