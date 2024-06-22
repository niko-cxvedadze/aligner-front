import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  return <TooltipProvider>{children}</TooltipProvider>;
}
