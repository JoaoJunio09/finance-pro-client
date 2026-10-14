import type { LucideIcon } from "lucide-react";

export interface FlowOption {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  tone: "violet" | "green" | "orange" | "blue" | "pink";
  comingSoon?: boolean;
}