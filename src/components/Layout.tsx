import { Grid2, Grow } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import Header from "./Header";
import SubMenu from "./SubMenu";
import TheMenu from "./TheMenu";

const TheLayout: React.FC<PropsWithChildren> = ({ children }) => {
  // Quản lý trạng thái mở/đóng của SubMenu
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(true);

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <Grid2 container sx={{ height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <Grid2 size={1} width={80}>
        <TheMenu />
      </Grid2>

      {/* Main content area */}
      <Grid2 container size={11} flex={1}>
        <Grid2 size={12} sx={{ height: "100vh", display: "flex" }}>
          <SubMenu open={submenuOpen} />

          <Grid2 size={12} sx={{ display: "flex", flexDirection: "column" }}>
            {/* Header nhận props để điều khiển SubMenu */}
            <Header submenuOpen={submenuOpen} toggleSubmenu={toggleSubmenu} />

            {/* Nội dung chính scrollable */}
            <Grid2
              id="layoutContainer"
              sx={{
                flexGrow: 1,
                p: 2,
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#aaa",
                  borderRadius: "6px",
                },
              }}
            >
              <Grow in={true} timeout={500}>
                <div>{children}</div>
              </Grow>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default TheLayout;
