import { Moon, Sun } from "lucide-react";
import type { ThemeName } from "../../../context/ThemeContext";

export const firstSteps = ["Seu nome", "Seu ambiente", "Seu momento"];

export const themeOptions: {
  value: ThemeName;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    value: "light",
    label: "Claro",
    description: "Leve, aberto e cheio de luz.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Escuro",
    description: "Sóbrio, tranquilo e com contraste.",
    icon: Moon,
  },
];
