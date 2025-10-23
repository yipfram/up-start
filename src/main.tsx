import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

registerSW({
  immediate: true,
  onRegistered(sw) {
    if (sw) {
      console.log("PWA service worker registered");
    }
  },
  onRegisterError(error) {
    console.error("PWA registration failed", error);
  }
});
