import { createRoot } from "react-dom/client";
import "@/styles/main.scss";
import App from "./App.jsx";
import ErrorHandlers from "@/js/ErrorHandlers";
import { StrictMode } from "react";

new ErrorHandlers().promiseGlobalErrorSetup();

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
