import {
  BarChart as BarChartIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Group as GroupIcon,
  HelpOutline as HelpIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { JSX, useState } from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  path?: string;
  children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChartIcon />,
    children: [
      { id: "overview", label: "Tổng quan", path: "/analytics/overview" },
      {
        id: "transactions",
        label: "Giao dịch",
        path: "/analytics/transactions",
      },
      {
        id: "viewers",
        label: "Người dùng truy cập",
        path: "/analytics/viewers",
      },
    ],
  },
  {
    id: "products",
    label: "Sản phẩm",
    icon: <InventoryIcon />,
    path: "/products",
  },
  {
    id: "schedule",
    label: "Lịch trình",
    icon: <EventIcon />,
    path: "/schedule",
  },
  {
    id: "users",
    label: "Người dùng",
    icon: <GroupIcon />,
    children: [
      { id: "user_list", label: "Danh sách người dùng", path: "/users/list" },
      { id: "permissions", label: "Phân quyền", path: "/users/permissions" },
    ],
  },
  {
    id: "system",
    label: "Hệ thống",
    icon: <SettingsIcon />,
    children: [
      { id: "settings", label: "Cấu hình chung", path: "/system/settings" },
      { id: "logs", label: "Nhật ký hệ thống", path: "/system/logs" },
    ],
  },
  {
    id: "support",
    label: "Hỗ trợ",
    icon: <HelpIcon />,
    children: [
      {
        id: "help_center",
        label: "Trung tâm trợ giúp",
        path: "/support/help-center",
      },
      {
        id: "contact_support",
        label: "Liên hệ hỗ trợ",
        path: "/support/contact",
      },
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

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  return (
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
          backgroundColor: "#F8F9FA",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Avatar + Tên người dùng */}
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        <Avatar
          alt="User Avatar"
          src="https://via.placeholder.com/40"
          sx={{ width: 40, height: 40 }}
        />
        {!isCollapsed && (
          <Typography variant="subtitle1" sx={{ mt: 1, color: "#555" }}>
            Andrew Smith
          </Typography>
        )}
      </Toolbar>

      <Divider />

      {/* Danh sách menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuConfig.map((item) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            toggleMenu={toggleMenu}
            openMenus={openMenus}
          />
        ))}
      </List>

      <Divider />

      {/* Nút thu gọn sidebar */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <IconButton onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

interface MenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  toggleMenu: (menuId: string) => void;
  openMenus: { [key: string]: boolean };
}

const MenuItemComponent: React.FC<MenuItemProps> = ({
  item,
  isCollapsed,
  toggleMenu,
  openMenus,
}) => {
  const hasChildren = Boolean(item.children && item.children.length > 0);

  return (
    <>
      <ListItemButton onClick={() => hasChildren && toggleMenu(item.id)}>
        <ListItemIcon sx={{ color: "#555" }}>{item.icon}</ListItemIcon>
        {!isCollapsed && <ListItemText primary={item.label} />}
        {!isCollapsed &&
          hasChildren &&
          (openMenus[item.id] ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {hasChildren && (
        <Collapse
          in={openMenus[item.id] && !isCollapsed}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {item.children?.map((child) => (
              <ListItemButton key={child.id} sx={{ pl: 4 }}>
                <ListItemText primary={child.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarMenu;
