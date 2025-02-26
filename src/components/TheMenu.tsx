import LOGOVMS from "@assets/images/logo-vms.svg";
import useAuth from "@modules/login/hooks/useAuth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // States cho dropdown của desktop
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const [anchorElDevice, setAnchorElDevice] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn] = useState(true); // Thay bằng trạng thái đăng nhập thực tế
  const { logout } = useAuth();

  // Hook để kiểm tra màn hình mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Xử lý dropdown "Công việc"
  const handleTaskClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTask(event.currentTarget);
  };
  const handleTaskClose = () => {
    setAnchorElTask(null);
  };

  // Xử lý dropdown "Quản lí thiết bị cấu hình"
  const handleDeviceClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDevice(event.currentTarget);
  };
  const handleDeviceClose = () => {
    setAnchorElDevice(null);
  };

  // Xử lý avatar menu
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

  // Xử lý mở/đóng Drawer cho mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Nội dung của Drawer (mobile)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={LOGOVMS} alt="Logo" style={{ height: "40px" }} />
      </Typography>
      <Divider />
      <List>
        {/* Nhóm "Công việc" */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/assignee">
            <ListItemText primary="Tạo task" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/task-check">
            <ListItemText primary="Danh sách task" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/approval">
            <ListItemText primary="Danh sách chờ duyệt" />
          </ListItemButton>
        </ListItem>
        {/* Các liên kết khác */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user">
            <ListItemText primary="Nhân viên" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/customer">
            <ListItemText primary="Khách hàng" />
          </ListItemButton>
        </ListItem>
        {/* Nhóm "Quản lí thiết bị cấu hình" */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/product-list-detail">
            <ListItemText primary="Quản lí thiết bị" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/type-device">
            <ListItemText primary="Loại thiết bị" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/device">
            <ListItemText primary="Nhóm thiết bị" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/product">
            <ListItemText primary="Thiết bị" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/template-check-list">
            <ListItemText primary="Danh sách biểu mẫu" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#002f77",
          height: "70px",
        }}
      >
        <Grid2
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo */}
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

          {/* Nếu mobile, hiển thị hamburger ở bên phải */}
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Grid2
              container
              direction="row"
              justifyContent="space-between"
              px={2}
              flex={1}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Grid2 sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Dropdown cho nhóm công việc */}
                <Button
                  color="inherit"
                  onClick={handleTaskClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Công việc
                </Button>
                <Menu
                  anchorEl={anchorElTask}
                  open={Boolean(anchorElTask)}
                  onClose={handleTaskClose}
                >
                  <MenuItem
                    onClick={handleTaskClose}
                    component={Link}
                    to="/assignee"
                  >
                    Tạo task
                  </MenuItem>
                  <MenuItem
                    onClick={handleTaskClose}
                    component={Link}
                    to="/task-check"
                  >
                    Danh sách task
                  </MenuItem>
                  <MenuItem
                    onClick={handleTaskClose}
                    component={Link}
                    to="/approval"
                  >
                    Danh sách chờ duyệt
                  </MenuItem>
                </Menu>

                {/* Nút cho Nhân viên */}
                <Button
                  component={Link}
                  to="/user"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Nhân viên
                </Button>
                {/* Nút cho Khách hàng */}
                <Button
                  component={Link}
                  to="/customer"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Khách hàng
                </Button>
                <Button
                  component={Link}
                  to="/product-list-detail"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Quản lí thiết bị
                </Button>
                {/* Dropdown cho Quản lí thiết bị cấu hình */}
                <Button
                  color="inherit"
                  onClick={handleDeviceClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Quản lí cấu hình
                </Button>
                <Menu
                  anchorEl={anchorElDevice}
                  open={Boolean(anchorElDevice)}
                  onClose={handleDeviceClose}
                >
                  <MenuItem
                    onClick={handleDeviceClose}
                    component={Link}
                    to="/type-device"
                  >
                    Loại thiết bị
                  </MenuItem>
                  <MenuItem
                    onClick={handleDeviceClose}
                    component={Link}
                    to="/device"
                  >
                    Nhóm thiết bị
                  </MenuItem>
                  <MenuItem
                    onClick={handleDeviceClose}
                    component={Link}
                    to="/product"
                  >
                    Thiết bị
                  </MenuItem>
                  <MenuItem
                    onClick={handleDeviceClose}
                    component={Link}
                    to="/template-check-list"
                  >
                    Danh sách biểu mẫu
                  </MenuItem>
                </Menu>
              </Grid2>

              {/* Phần avatar và icon thông báo */}
              {isLoggedIn && (
                <Grid2 sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
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
          )}
        </Grid2>
      </AppBar>

      {/* Drawer cho mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Cải thiện hiệu năng trên mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
