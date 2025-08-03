import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./server/store/store.js";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </StyledEngineProvider>
  </StrictMode>
);
