import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";
import TheMenu from "./TheMenu";

const TheLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TheMenu />
      <Box
        id="layoutContainer"
        sx={{
          p: 2, // Padding for the content

          overflowY: "scroll", // Enable scrolling for the Box
          flexGrow: 1, // Fill remaining space
          overflowX: "hidden", // Prevent horizontal scrolling
          scrollbarWidth: "thin", // For Firefox
          "&::-webkit-scrollbar": {
            width: "12px", // Width of the scrollbar
          },
        }}
      >
        <div style={{ padding: "8px" }}>{children}</div>
      </Box>
    </div>
  );
};

export default TheLayout;
