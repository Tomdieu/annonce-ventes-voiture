import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import './index.css'
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

import AuthProvider from './provider/AuthProvider'


const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Fira Code",
    },
  })
);


ReactDOM.render(<ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>, document.getElementById("root"));
