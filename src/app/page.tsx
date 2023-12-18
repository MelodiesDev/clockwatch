import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import React from "react";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div></div>
    </ThemeProvider>
  );
}
