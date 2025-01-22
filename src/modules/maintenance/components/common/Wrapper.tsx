import { Box, Paper, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface Props {
  title: string;
  subtitle?: string; // Thêm phụ đề tùy chọn
  actions?: React.ReactNode; // Thêm khu vực hành động (nút hoặc link)
}

const Wrapper: React.FC<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box>{children}</Box>
    </Paper>
  );
};

export default Wrapper;
