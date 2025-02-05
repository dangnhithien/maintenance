import { Grid2 } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <img
            src="http://report.vmsco.com.vn/assets/logo-vms-Byn70t6I.webp"
            alt="Logo"
            style={{ height: "40px" }}
          />

          {/* Tam giác separator trắng */}
          <div
            style={{
              position: "absolute",
              right: "-24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "35px solid transparent", // 50% chiều cao container
              borderBottom: "35px solid transparent", // 50% chiều cao container
              borderLeft: "25px solid white",
            }}
          />
        </Typography>

        {/* Phần menu */}
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
            {/* Dropdown button menu */}
            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              onClick={handleClick}
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
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/template-check-list"
              >
                Danh sách biểu mẫu
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/device">
                Nhóm thiết bị
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
              <MenuItem onClick={handleClose} component={Link} to="/product">
                Thiết bị
              </MenuItem>
            </Menu>
            <Button
              component={Link}
              to="/task-check"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Lịch sử quét
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </AppBar>
  );
};

export default Navbar;
