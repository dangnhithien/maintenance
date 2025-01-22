import { Grid2 } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
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
            lineHeight: "70px",
            padding: "0 20px",
          }}
        >
          <img
            src="http://report.vmsco.com.vn/assets/logo-vms-Byn70t6I.webp" // Replace with your logo source
            alt="Logo"
            style={{ height: "40px", verticalAlign: "middle" }}
          />
        </Typography>

        {/* Menu Items */}
        <Grid2
          container
          direction={"row"}
          justifyContent={"space-between"}
          px={2}
        >
          <Grid2
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexFlow: 1,
            }}
          >
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
          </Grid2>

          {/* Icons */}
          {/* <Grid2
              sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}
            >
              <IconButton color="inherit">
                <Flag />
              </IconButton>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <IconButton color="inherit">
                <Language />
              </IconButton>
            </Grid2> */}
          {/* Logo */}
        </Grid2>
      </Grid2>
    </AppBar>
  );
};

export default Navbar;
