import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

import AuthProvider from "./provider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Fira Code",
    },
  })
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>
);
