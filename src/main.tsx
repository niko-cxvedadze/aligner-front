import React from "react";
import App from "./App.tsx";
import "@/assets/global.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "./providers/ClerkProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { GlobalProvider } from "@/providers/GlobalProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <ThemeProvider>
        <ClerkProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ClerkProvider>
      </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>
);
