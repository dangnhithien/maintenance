import LOGOVMS from "@assets/images/logo-vms.svg";
import { Home, Logout, Person, Settings } from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Định nghĩa danh sách menu chính với subPaths
const menuItems = [
  {
    label: "Home",
    icon: <Home sx={{ width: 28, height: 28 }} color="info" />,
    to: "/",
    subPaths: ["/device-monitoring", "/maintenance-tech", "/task-status"],
  },
  {
    label: "Thiết bị",
    icon: <DevicesOtherIcon sx={{ width: 28, height: 28 }} color="info" />,
    to: "/devices",
    subPaths: [
      "/device-types",
      "/device-groups",
      " /device-SKUs",
      "/device-models",
      "/devices",
    ],
  },
  {
    label: "Linh kiện",
    icon: <DeviceHubIcon sx={{ width: 28, height: 28 }} color="info" />,
    to: "/part-details",
    subPaths: [
      "/part-categories",
      "/part-types",
      "/part-groups",
      "/part-SKUs",
      "/part-models",
      "/part-details",
    ],
  },
  {
    label: "Nhân viên ",
    icon: <PeopleAltOutlinedIcon sx={{ width: 28, height: 28 }} color="info" />,
    to: "/user",
    subPaths: ["/user"],
  },
  {
    label: "Công việc ",
    icon: (
      <AssignmentOutlinedIcon sx={{ width: 28, height: 28 }} color="info" />
    ),
    to: "/cases",
    subPaths: ["/cases", "/task-check", "task/assignee"],
  },
  {
    label: "Khách hàng",
    icon: <LocationCityIcon sx={{ width: 28, height: 28 }} color="info" />,
    to: "/customer",
    subPaths: ["/customer/details", "/customer/orders", "/task-assigness"],
  },
];

const TheMenu: React.FC = () => {
  const location = useLocation();

  // State để điều khiển menu avatar
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User logged out"); // Gọi hàm logout tại đây
    handleClose();
  };

  // Kiểm tra nếu menu active (hỗ trợ subPaths)
  const isActive = (path: string, subPaths: string[] = []) => {
    if (location.pathname === path) return true; // Ưu tiên nếu đường dẫn chính khớp hoàn toàn
    return subPaths.some((sub) => location.pathname.startsWith(sub));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#fff",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 12px",
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* Logo trên cùng */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <img
            src={LOGOVMS}
            alt="Logo"
            style={{ width: "80px", height: "auto" }}
          />
        </Box>

        {/* Render menu chính */}
        <Box>
          {menuItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: "0.75rem",
                justifyContent: "center",
              }}
            >
              <Tooltip title={item.label} placement="right">
                <IconButton
                  size="small"
                  component={NavLink}
                  to={item.to}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: isActive(item.to, item.subPaths)
                      ? "#e3f2fd"
                      : "transparent",
                    color: isActive(item.to, item.subPaths)
                      ? "#1976d2"
                      : "#999",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: isActive(item.to, item.subPaths)
                        ? "#bbdefb"
                        : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </div>

      {/* Avatar và Cài đặt */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        {/* Avatar của người dùng */}
        <Tooltip title="Profile" placement="right">
          <IconButton
            size="small"
            onClick={handleAvatarClick}
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
            }}
            color="info"
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src="https://via.placeholder.com/150" // Thay bằng đường dẫn ảnh avatar thực tế
              alt="User Avatar"
            />
          </IconButton>
        </Tooltip>

        {/* Menu khi click vào Avatar (Hiển thị bên phải) */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{ mt: 1 }}
          PaperProps={{
            elevation: 3,
            sx: {
              width: "200px",
              borderRadius: "8px",
              ml: 2,
            },
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <MenuItem component={NavLink} to="/profile">
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Thông tin cá nhân</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Đăng xuất</Typography>
          </MenuItem>
        </Menu>

        {/* Cài đặt */}
        <Tooltip title="Settings" placement="right">
          <IconButton
            size="small"
            component={NavLink}
            to="/settings"
            sx={{
              borderRadius: "8px",
              color: "#999",
              transition: "color 0.3s",
              "&:hover": {
                color: "#1976d2",
              },
            }}
          >
            <Settings sx={{ width: 28, height: 28 }} color="info" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TheMenu;
