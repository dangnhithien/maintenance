import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  text: string;
  link: string;
}

interface MenuGroup {
  id: string;
  groupTitle: string;
  items: MenuItem[];
}

// Cấu hình menu toàn cục – mỗi nhóm có tiêu đề và danh sách các item
const menuConfig: MenuGroup[] = [
  {
    id: "overview",
    groupTitle: "Tổng quan",
    items: [
      { text: "Tổng quan", link: "/" },
      // { text: "Theo dõi bảo trì thiết bị", link: "/device-monitoring" },
      // { text: "Theo dõi kỹ thuật bảo trì", link: "/maintenance-tech" },
      // { text: "Tình trạng task", link: "/task-status" },
    ],
  },
  {
    id: "Thiết bị",
    groupTitle: "Thiết bị",
    items: [
      { text: "Loại thiết bị", link: "/device-types" },
      { text: "Nhóm thiết bị", link: "/device-groups" },
      { text: "SKU thiết bị", link: "/device-SKUs" },
      { text: "Đời thiết bị", link: "/device-models" },
      { text: "Thiết bị", link: "/devices" },
    ],
  },
  {
    id: "Linh kiện",
    groupTitle: "Linh kiện",
    items: [
      { text: "Danh mục linh kiện", link: "/part-categories" },
      { text: "Loại linh kiện", link: "/part-types" },
      { text: "Nhóm linh kiện", link: "/part-groups" },
      { text: "SKU linh kiện", link: "/part-SKUs" },
      { text: "Linh kiện", link: "/part-details" },
    ],
  },
  {
    id: "Nhân viên",
    groupTitle: "Nhân viên",
    items: [{ text: "Danh sách nhân viên", link: "/user" }],
  },
  {
    id: "khachHang",
    groupTitle: "Khách hàng",
    items: [{ text: "Danh sách khách hàng", link: "/customer" }],
  },
  {
    id: "Phiếu",
    groupTitle: "Phiếu",
    items: [{ text: "Danh sách phiếu", link: "/template-check-list" }],
  },
  {
    id: "Công việc",
    groupTitle: "Công việc",
    items: [
      { text: "Case", link: "/cases" },
      { text: "Điều phối", link: "/tasks/assignee" },
      { text: "Lịch sử", link: "/task-check" },
    ],
  },
];

interface SubMenuProps {
  open: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({ open }) => {
  const location = useLocation();

  // State lưu nhóm được chọn (target group)
  const [targetGroup, setTargetGroup] = useState<MenuGroup | null>(null);
  // State collapse/expand của các nhóm (key: id của nhóm)
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  // Khi component mount hoặc URL thay đổi, tìm nhóm chứa item có link trùng với URL hiện tại
  useEffect(() => {
    const found = menuConfig.find((group) =>
      group.items.some((item) => item.link === location.pathname)
    );
    setTargetGroup(found || menuConfig[0]);
  }, [location.pathname]);

  // Khi targetGroup thay đổi, chỉ mở nhóm target, các nhóm khác đóng
  useEffect(() => {
    if (targetGroup) {
      const newOpenGroups = menuConfig.reduce((acc, group) => {
        acc[group.id] = group.id === targetGroup.id;
        return acc;
      }, {} as { [key: string]: boolean });
      setOpenGroups(newOpenGroups);
    }
  }, [targetGroup]);

  // Toggle collapse cho nhóm (nếu nhóm đó không phải target)
  const toggleGroup = (groupId: string) => {
    if (targetGroup?.id !== groupId) {
      setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
    }
  };

  // Khi click vào một item con, cập nhật targetGroup
  const handleItemClick = (group: MenuGroup, item: MenuItem) => {
    if (targetGroup?.id !== group.id) {
      setTargetGroup(group);
    }
  };

  // Các nhóm không phải target
  const otherGroups = menuConfig.filter(
    (group) => group.id !== targetGroup?.id
  );

  // Style chung cho item: mũi tên bên trái, màu xám, font 14px
  const itemSx = {
    color: "#999",
    paddingLeft: "8px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  };
  const textSx = { fontSize: "14px", color: "inherit" };
  const iconSx = { minWidth: "24px", color: "#648CC8" };

  return (
    <Box
      sx={{
        width: open ? "100%" : 0,
        transition: "width 0.5s ease",
        overflow: "hidden",
        backgroundColor: "#fff",
        maxWidth: "240px",
        borderRight: open ? "1px solid #ccc" : "none",
        height: "100vh",
      }}
    >
      <Box>
        {/* VÙNG TARGET: Slide animation với timeout 600ms */}
        {targetGroup && (
          <Slide
            key={targetGroup.id}
            in={true}
            direction="down"
            mountOnEnter
            unmountOnExit
            timeout={300}
          >
            <Box sx={{ borderBottom: "1px solid #ccc", mb: 2 }}>
              <Typography variant="h6" fontWeight={"bold"} p={2} color="#999">
                {targetGroup.groupTitle}
              </Typography>
              <List disablePadding>
                {targetGroup.items.map((item) => (
                  <ListItemButton
                    key={item.link}
                    component={Link}
                    to={item.link}
                    selected={location.pathname === item.link}
                    onClick={() => handleItemClick(targetGroup, item)}
                    sx={{
                      ...itemSx,
                      "&.Mui-selected": {
                        backgroundColor: "#648CC8", // Màu nền khi được chọn
                        color: "#fff", // Màu chữ khi được chọn
                        "&:hover": {
                          backgroundColor: "#648CC8", // Giữ màu nền khi hover nếu đang được chọn
                          color: "#fff", // Giữ màu chữ khi hover nếu đang được chọn
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ ...iconSx, minWidth: "auto", mr: "4px" }}
                    >
                      <ArrowRightIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ sx: textSx }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Slide>
        )}

        {/* NHÓM KHÁC BÊN DƯỚI */}
        {otherGroups.map((group) => (
          <Box key={group.id}>
            <ListItemButton
              onClick={() => toggleGroup(group.id)}
              sx={{
                color: "#999",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                border: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItemText
                  primary={group.groupTitle}
                  primaryTypographyProps={{
                    fontSize: 14,
                    color: "#999",
                    fontWeight: "bold",
                  }}
                  sx={{ display: "inline-block", marginRight: "4px" }}
                />
                {/* Sử dụng ArrowRightIcon với hiệu ứng xoay khi mở */}
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGroup(group.id);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.3s",
                    transform: openGroups[group.id]
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <ArrowRightIcon fontSize="small" sx={{ color: "#648CC8" }} />
                </Box>
              </Box>
            </ListItemButton>
            <Collapse in={openGroups[group.id]} timeout="auto" unmountOnExit>
              <List disablePadding>
                {group.items.map((item) => (
                  <ListItemButton
                    key={item.link}
                    component={Link}
                    to={item.link}
                    selected={location.pathname === item.link}
                    onClick={() => handleItemClick(group, item)}
                    sx={{ ...itemSx }}
                  >
                    <ListItemIcon
                      sx={{ ...iconSx, minWidth: "auto", mr: "4px" }}
                    >
                      <ArrowRightIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ sx: textSx }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SubMenu;
