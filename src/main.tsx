import App from "./App.tsx";
import "@/assets/global.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "./providers/ClerkProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { AuthProvider } from "./providers/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalProvider>
    <ThemeProvider>
      <ClerkProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ClerkProvider>
    </ThemeProvider>
  </GlobalProvider>
);
