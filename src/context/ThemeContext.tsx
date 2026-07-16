import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { themes, type ThemeName } from "../themes/Themes";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
 const [theme, setTheme] = useState<ThemeName>(()=>{
   const saved = localStorage.getItem("theme");

   return saved === "light"
      ? "light"
      : "dark";
 });

 useEffect(()=>{
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
 },[theme]);

 return (
  <ThemeContext.Provider
    value={{
      theme,
      setTheme
    }}
  >
    {children}
  </ThemeContext.Provider>
 )
}

export function useThemeContext(){
 const context = useContext(ThemeContext);

 if (!context) {
    throw new Error("useTheme precisa estar dentro do ThemeProvider");
 }

 return context;
}