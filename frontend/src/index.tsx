import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./blog/theme";
import { ThemeProvider } from "@mui/material";
import store from "./blog/store/store";
import { CookiesProvider } from "react-cookie";
import App from "./login/Route";
import Cookie from "./blog/cookie"

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CookiesProvider>
            <App />
            <Cookie/>
          </CookiesProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
