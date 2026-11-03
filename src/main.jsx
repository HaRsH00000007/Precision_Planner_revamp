import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initSmoothScroll } from "./lib/smoothScroll.js";
import App from "./App.jsx";
import "./index.css";

// Start Lenis before React renders: sections check for it while setting up their scroll triggers.
initSmoothScroll();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
