import LOGOVMS from "@assets/images/logo-vms.svg";
import {
  BarChart as BarChartIcon,
  ChevronLeft,
  Group as GroupIcon,
  Home,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WorkIcon from "@mui/icons-material/Work";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho menu
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "overview",
    label: "Tổng quan",
    icon: <Home />,
    children: [{ id: "tong-quan", label: "Tổng quan", path: "/" }],
  },
  {
    id: "thiet-bi",
    label: "Thiết bị",
    icon: <InventoryIcon />,
    children: [
      { id: "loai-thiet-bi", label: "Loại thiết bị", path: "/device-types" },
      { id: "nhom-thiet-bi", label: "Nhóm thiết bị", path: "/device-groups" },
      { id: "sku-thiet-bi", label: "SKU thiết bị", path: "/device-SKUs" },
      { id: "doi-thiet-bi", label: "Đời thiết bị", path: "/device-models" },
      { id: "thiet-bi", label: "Thiết bị", path: "/devices" },
    ],
  },
  {
    id: "linh-kien",
    label: "Linh kiện",
    icon: <BarChartIcon />,
    children: [
      {
        id: "danh-muc-linh-kien",
        label: "Danh mục linh kiện",
        path: "/part-categories",
      },
      { id: "loai-linh-kien", label: "Loại linh kiện", path: "/part-types" },
      { id: "nhom-linh-kien", label: "Nhóm linh kiện", path: "/part-groups" },
      { id: "sku-linh-kien", label: "SKU linh kiện", path: "/part-SKUs" },
      { id: "linh-kien", label: "Linh kiện", path: "/part-details" },
    ],
  },
  {
    id: "nhan-vien",
    label: "Nhân viên",
    icon: <GroupIcon />,
    children: [
      {
        id: "danh-sach-nhan-vien",
        label: "Danh sách nhân viên",
        path: "/user",
      },
    ],
  },
  {
    id: "khach-hang",
    label: "Khách hàng",
    icon: <PeopleIcon />,
    children: [
      {
        id: "danh-sach-khach-hang",
        label: "Danh sách khách hàng",
        path: "/customer",
      },
    ],
  },
  {
    id: "phieu",
    label: "Phiếu",
    icon: <ReceiptIcon />,
    children: [
      {
        id: "danh-sach-phieu",
        label: "Danh sách phiếu",
        path: "/template-check-list",
      },
    ],
  },
  {
    id: "cong-viec",
    label: "Công việc",
    icon: <WorkIcon />,
    children: [
      { id: "case", label: "Case", path: "/cases" },
      { id: "dieu-phoi", label: "Điều phối", path: "/tasks/assignee" },
      { id: "lich-su", label: "Lịch sử", path: "/task-check" },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const drawerCollapsedWidth = 80;
const drawerWidth = 240;

const SidebarMenu: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();
  const navigate = useNavigate();

  // Hàm đảm bảo chỉ có một menu mở tại một thời điểm
  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => {
      if (prev[menuId]) {
        return {};
      } else {
        return { [menuId]: true };
      }
    });
  };

  // Kiểm tra xem menu (bao gồm cả menu con) có đang active hay không
  const isItemActive = (item: MenuItem) => {
    if (item.path) return location.pathname === item.path;
    if (item.children)
      return item.children.some((child) => location.pathname === child.path);
    return false;
  };

  // Hàm xử lý đăng xuất: xóa token khỏi localStorage và chuyển hướng về trang đăng nhập
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Nút thu/expand sidebar */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          top: 15,
          right: isCollapsed ? -45 : -15,
          backgroundColor: "#FFF",
          borderRadius: isCollapsed ? "0" : "8px",
          width: 32,
          height: 32,
          boxShadow: isCollapsed ? "none" : "0px 4px 6px rgba(0,0,0,0.1)",
          zIndex: 2,
          "&:hover": { backgroundColor: "#F0F0F0" },
          transition:
            "right 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out",
        }}
      >
        {isCollapsed ? (
          <ArrowRightIcon sx={{ fontSize: 20, color: "#000000" }} />
        ) : (
          <ChevronLeft sx={{ fontSize: 20, color: "#000000" }} />
        )}
      </IconButton>

      <Drawer
        variant="permanent"
        sx={{
          width: isCollapsed ? drawerCollapsedWidth : drawerWidth,
          flexShrink: 0,
          transition: "width 0.3s ease-in-out",
          "& .MuiDrawer-paper": {
            width: isCollapsed ? drawerCollapsedWidth : drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease-in-out",
            backgroundColor: "#FFF",
            color: "#333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 1,
            height: "100%",
            overflow: "hidden",
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            minHeight: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isCollapsed ? drawerCollapsedWidth : "100%",
            transition: "width 0.3s ease-in-out",
            px: 2,
          }}
        >
          <img
            alt="Logo VMS"
            src={LOGOVMS}
            style={{
              width: 64,
              height: 64,
              transition: "margin-left 0.3s ease-in-out",
            }}
          />
        </Box>

        <Divider />

        {/* Danh sách menu */}
        <List sx={{ flex: 1, overflowY: "auto" }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItemButton
                selected={isItemActive(item)}
                onClick={() => {
                  if (item.children) {
                    if (isCollapsed) {
                      // Khi đang thu gọn, click vào menu có children sẽ mở sidebar và mở menu đó
                      toggleSidebar();
                      setOpenMenus({ [item.id]: true });
                    } else {
                      toggleMenu(item.id);
                    }
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    // color: "#10428E",
                    minWidth: 40,
                    justifyContent: "center",
                    display: "flex",
                    transition: "justify-content 0.3s ease-in-out",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    fontSize: "14px",
                    maxWidth: isCollapsed ? 0 : "100%",
                    opacity: isCollapsed ? 0 : 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition:
                      "max-width 0.3s ease-in-out, opacity 0.3s ease-in-out",
                  }}
                />
                {!isCollapsed &&
                  item.children &&
                  (openMenus[item.id] ? (
                    <ArrowDropUpIcon sx={{ color: "#000000" }} />
                  ) : (
                    <ArrowDropDownIcon sx={{ color: "#000000" }} />
                  ))}
              </ListItemButton>

              {item.children && (
                <Collapse
                  in={openMenus[item.id] && !isCollapsed}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <ListItemButton
                          key={child.id}
                          sx={{ pl: 4 }}
                          selected={isChildActive}
                          onClick={() => navigate(child.path!)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 40,
                              color: "#000000",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowRightIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            sx={{
                              fontSize: "14px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              ...(isChildActive && {
                                fontWeight: "bold",
                                color: "#000000",
                              }),
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        <Divider />

        {/* Item Đăng xuất với hiệu ứng collapse/expand */}
        <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon
              sx={{
                color: "#000",
                minWidth: 40,
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Đăng xuất"
              sx={{
                fontSize: "14px",
                maxWidth: isCollapsed ? 0 : "100%",
                opacity: isCollapsed ? 0 : 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition:
                  "max-width 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
};

export default SidebarMenu;
