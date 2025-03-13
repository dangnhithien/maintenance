import EventNoteIcon from "@mui/icons-material/EventNote";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface HeaderProps {
  submenuOpen?: boolean;
  toggleSubmenu?: () => void;
}

// Tạo container cho ô tìm kiếm
const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(0.5, 2),
  gap: theme.spacing(1),
  width: 280,
}));

// Input tìm kiếm
const StyledInputBase = styled(InputBase)({
  width: "100%",
});

const Header: React.FC<HeaderProps> = ({ submenuOpen, toggleSubmenu }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "inherit",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Nút quay lại */}
        {/* <IconButton edge="start" onClick={toggleSubmenu} color="info">
          {submenuOpen ? (
            <ArrowBackIosNewIcon fontSize="small" />
          ) : (
            <ArrowForwardIos fontSize="small" />
          )}
        </IconButton> */}
        <div></div>

        {/* Nhóm icon bên phải */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Thanh tìm kiếm */}
          <SearchContainer>
            <SearchIcon color="action" />
            <StyledInputBase placeholder="Tìm kiếm thông tin" />
          </SearchContainer>
          {/* Icon thông báo */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Icon hình hộp hoặc tài khoản (bổ sung theo ảnh) */}
          <IconButton color="inherit">
            <EventNoteIcon sx={{ width: 24, height: 24 }} />
          </IconButton>

          {/* Cờ Việt Nam có nền đỏ */}
          <Box
            sx={{
              width: 32,
              height: 24,
              backgroundColor: "#d32f2f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
            }}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
              alt="Vietnam Flag"
              sx={{ width: 20, height: 14 }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
