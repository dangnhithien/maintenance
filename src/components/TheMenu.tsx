import { Flag, Language, Notifications } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#002f77" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            src="logo.png" // Replace with your logo source
            alt="Logo"
            style={{ height: "40px", verticalAlign: "middle" }}
          />
        </Typography>

        {/* Menu Items */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={Link}
            to="/type-device"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Loại thiết bị
          </Button>
          <Button
            component={Link}
            to="/device"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Thiết bị
          </Button>
          <Button
            component={Link}
            to="/error-detail"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Danh mục lỗi
          </Button>
          <Button
            component={Link}
            to="/survey/config"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            cấu hình phiếu khảo sát
          </Button>

          <Button
            color="inherit"
            sx={{ textTransform: "none" }}
            onClick={handleMenuOpen}
          >
            Phiếu khảo sát
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/survey-option1"
              onClick={handleMenuClose}
            >
              Option 1
            </MenuItem>
            <MenuItem
              component={Link}
              to="/survey-option2"
              onClick={handleMenuClose}
            >
              Option 2
            </MenuItem>
          </Menu>
          <Button
            component={Link}
            to="/history"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Lịch sử
          </Button>
          <Button
            component={Link}
            to="/reports"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Báo cáo
          </Button>
        </Box>

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
          <IconButton color="inherit">
            <Flag />
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Language />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
