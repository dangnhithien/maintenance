import { Box, Grow } from "@mui/material";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import SidebarMenu from "./TestMenu";

const TheLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    setSubmenuOpen(true);
  }, [location]);

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <SidebarMenu
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease-in-out",

          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* Header */}
        <Header submenuOpen={submenuOpen} toggleSubmenu={toggleSubmenu} />

        {/* Nội dung chính scrollable */}
        <Box
          id="layoutContainer"
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#aaa",
              borderRadius: "6px",
            },
          }}
        >
          <Grow in={true} timeout={500}>
            <div>{children}</div>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
};

export default TheLayout;
