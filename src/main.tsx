import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Sycm } from "./pages/sycm/Sycm";

import "ag-grid-community/styles/ag-grid.min.css";
import "ag-grid-community/styles/ag-theme-material.min.css";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Sycm />
  </React.StrictMode>
);
