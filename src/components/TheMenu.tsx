import LOGOVMS from "@assets/images/logo-vms.svg";
import useAuth from "@modules/login/hooks/useAuth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Grid2 } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoggedIn] = useState(true); // Replace with actual authentication state
  const { logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleAvatarMenuClose();
    logout();
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#002f77",
        height: "70px",
      }}
    >
      <Grid2 container direction={"row"}>
        <Link to="/">
          <Typography
            variant="h6"
            component="div"
            sx={{
              backgroundColor: "white",
              height: "70px",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
              overflow: "visible",
              marginRight: "25px",
            }}
          >
            <img src={LOGOVMS} alt="Logo" style={{ height: "40px" }} />

            {/* White triangle separator */}
            <div
              style={{
                position: "absolute",
                right: "-24px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "35px solid transparent",
                borderBottom: "35px solid transparent",
                borderLeft: "25px solid white",
              }}
            />
          </Typography>
        </Link>

        {/* Menu section */}
        <Grid2
          container
          direction={"row"}
          justifyContent={"space-between"}
          px={2}
          flex={1}
        >
          <Grid2
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to="/product-list-detail"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Danh sách thiết bị
            </Button>
            <Button
              component={Link}
              to="/task-check"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Lịch sử quét
            </Button>
            <Button
              component={Link}
              to="/approval"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Danh sách chờ duyệt
            </Button>
            {/* Dropdown menu button */}
            <Button
              color="inherit"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Cấu hình
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/type-device"
              >
                Loại thiết bị
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/device">
                Nhóm thiết bị
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/product">
                Thiết bị
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/template-check-list"
              >
                Danh sách biểu mẫu
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/type-error">
                Loại lỗi
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/error-detail"
              >
                Danh mục lỗi
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/solution-option"
              >
                Giải pháp
              </MenuItem>
            </Menu>
          </Grid2>

          {/* Avatar section */}
          {isLoggedIn && (
            <Grid2
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleAvatarMenuOpen} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="" />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleAvatarMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    mt: 1.5,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </AppBar>
  );
};

export default Navbar;
