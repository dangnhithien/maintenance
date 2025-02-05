import { Grid2 } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
            {/* Các button menu giữ nguyên */}
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
              to="/template-check-list"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Danh sách biểu mẫu
            </Button>
            <Button
              component={Link}
              to="/device"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Nhóm thiết bị
            </Button>
            <Button
              component={Link}
              to="/type-error"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Loại lỗi
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
              to="/solution-option"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Giải pháp
            </Button>
            <Button
              component={Link}
              to="/product"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Thiết bị
            </Button>
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
