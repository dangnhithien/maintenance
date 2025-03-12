// App.tsx

import TheLayout from "@components/Layout";
import RequireAuth from "@components/RequireAuth";
import LoginRoutes from "@modules/login/routes/LoginRoutes";
import { NoistackProvider } from "@modules/maintenance/components/common/Notistack";
import { createTheme, ThemeProvider } from "@mui/material";
import AllRoutes from "./routes/AllRoutes";

const mdTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "7px 10px !important",
          minWidth: "0px",
        },
        containedPrimary: {
          color: "white", // Màu chữ ghi đè
          backgroundColor: "#10428E", // Màu nền ghi đè
        },
        containedSecondary: {
          color: "#24416F", // Màu chữ ghi đè
          backgroundColor: "#C3D5F1", // Màu nền ghi đè
          ":hover": {
            color: "#24416F", // Màu chữ ghi đè
            backgroundColor: "#EBF1FA", // Màu nền ghi đè
          },
        },
        containedSuccess: {
          color: "white", // Màu chữ ghi đè
          backgroundColor: "#0ABF06", // Màu nền ghi đè
          ":hover": {
            color: "white", // Màu chữ ghi đè
            backgroundColor: "#109e0e", // Màu nền ghi đè
          },
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
      boxShadow: "none",
    },
  },
  palette: {
    primary: {
      main: "#10428E", // Màu primary mà bạn muốn áp dụng
    },
    info: {
      main: "#648CC8",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <NoistackProvider>
        <LoginRoutes />
        <RequireAuth redirectTo={"/login"}>
          <TheLayout>
            <AllRoutes />
          </TheLayout>
        </RequireAuth>
      </NoistackProvider>
    </ThemeProvider>
  );
}

export default App;
