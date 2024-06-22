import App from "./App.tsx";
import "@/assets/global.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PublicProviders } from "./providers/public/Providers.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <PublicProviders>
        <App />
      </PublicProviders>
    </QueryClientProvider>
  </BrowserRouter>
);
