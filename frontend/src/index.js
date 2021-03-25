import React from 'react'
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from './App'
import { ThemeProvider } from "@material-ui/core/styles";
import theme from './theme';

const rootElement = document.getElementById("root");
ReactDOM.render(
  
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  ,rootElement
);
