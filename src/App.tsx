// App.tsx

import TheLayout from "@components/Layout";
import { NoistackProvider } from "@modules/maintenance/components/common/Notistack";
import { createTheme, ThemeProvider } from "@mui/material";
import AllRoutes from "./routes/AllRoutes";

const mdTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
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
  },
});

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <NoistackProvider>
        <TheLayout>
          <AllRoutes />
        </TheLayout>
      </NoistackProvider>
    </ThemeProvider>
  );
}

export default App;
