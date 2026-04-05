"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


/**
 * ThemeProvider
 *
 * This component implements the global theme system for the application.
 * It is responsible for managing and exposing the current theme state.
 *
 * Responsibilities:
 *
 * 1. Manage the global theme state
 *    - Supports two modes: "light" and "dark".
 *
 * 2. Provide a function to toggle the theme
 *    - light → dark
 *    - dark → light
 *
 * 3. Persist the user's theme preference
 *    - Read the theme from localStorage on initial load
 *    - Save the theme to localStorage whenever it changes
 *
 * 4. Sync the theme with the root HTML element
 *    - Update the <html> element with a data attribute:
 *        data-theme="light"
 *        data-theme="dark"
 *    - This allows CSS to implement theme-based styling later.
 *
 * This file contains the core logic for the theme system and should
 * wrap the entire application (via app/layout.tsx).
 */

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark" ? "dark" : "light";
    });

    const toggleTheme = async () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}