import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { createContext, useContext, useEffect } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {};

const initialState: ThemeProviderState = {};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  return (
    <ThemeProviderContext.Provider {...props} value={{}}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
