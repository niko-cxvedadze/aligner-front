import App from "./App.tsx";
import "@/assets/global.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./providers/Providers.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Providers>
        <App />
      </Providers>
    </QueryClientProvider>
  </BrowserRouter>
);
