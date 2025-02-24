import { Box } from "@mui/material";
import React from "react";

interface FixedLeftScrollRightTemplateProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: number;
  topOffset?: number;
  bottomOffset?: number;
}

const FixedLeftScrollRightTemplate: React.FC<
  FixedLeftScrollRightTemplateProps
> = ({
  leftContent,
  rightContent,
  leftWidth = 350,
  topOffset = 0,
  bottomOffset = 0,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      {/* Container bên trái cố định */}
      <Box
        sx={{
          position: "fixed",
          top: topOffset,
          left: 16,
          bottom: bottomOffset,
          width: leftWidth,
          overflowY: "auto",
        }}
      >
        {leftContent}
      </Box>

      {/* Container bên phải cuộn được */}
      <Box
        sx={{
          marginLeft: `${leftWidth}px`,
          pb: "16px",
          overflowY: "hidden",
        }}
      >
        {rightContent}
      </Box>
    </Box>
  );
};

export default FixedLeftScrollRightTemplate;
