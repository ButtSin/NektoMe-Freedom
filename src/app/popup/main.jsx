import { createRoot } from "react-dom/client";
import "@/app/styles/main.scss";
import App from "./App.jsx";
import ErrorHandlers from "@/shared/lib/ErrorHandler.js";
import { StrictMode } from "react";
import { ThemeProvider } from "@/app/providers/ThemeContext.jsx";

new ErrorHandlers().promiseGlobalErrorSetup();

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
