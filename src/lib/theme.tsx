"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#757ce8",
      main: "#1F1F33",
      dark: "#1D1D33"
      // contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    },
    background: {
      default: "#1D1D33",
      paper: "#1D1D33"
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: undefined
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#24243c",
          color: "#fefefe",
          backgroundImage: "none",
          borderBottom: "solid 1px rgba(255,255,255,0.25)"
        }
      }
    }
  }
});

export default theme;
