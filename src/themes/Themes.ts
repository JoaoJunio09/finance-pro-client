export type ThemeName = "dark" | "light";

export interface Theme {
  name: ThemeName;

  common: {
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    border: {
      subtle: string;
      strong: string;
    };
    primary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    shadow: string;
  };

  dashboard: {
    plasma: {
      primary: string;
      income: string;
      expense: string;
    };
    glass: {
      background: string;
    };
    card: {
      shadow: string;
    };
    dock: {
      background: string;
      border: string;
      glow: string;
    };
    drawer: {
      background: string;
      border: string;
      shadow: string;
    };
    wallet: {
      shine: string;
      border: string;
    };
    illustration: {
      primary: string;
      secondary: string;
    };
    category: {
      colors: {
        food: string;
        housing: string;
        transport: string;
        health: string;
        subscriptions: string;
      };
    };
  };
}

export const themes: Record<ThemeName, Theme> = {
  dark: {
    name: "dark",
    common: {
      background: "#09090B",
      surface: "#111113",
      foreground: "#FFFFFF",
      muted: "#A1A1AA",
      border: {
        subtle: "rgba(255,255,255,0.04)",
        strong: "rgba(255,255,255,0.08)",
      },
      primary: "#8B5CF6",
      success: "#10B981",
      danger: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
      shadow: "0 20px 40px -10px rgba(0,0,0,0.7)",
    },
    dashboard: {
      plasma: {
        primary: "rgba(139,92,246,0.15)",
        income: "rgba(16,185,129,0.08)",
        expense: "rgba(239,68,68,0.05)",
      },
      glass: {
        background: "rgba(9,9,11,0.6)",
      },
      card: {
        shadow: "0 20px 40px -10px rgba(0,0,0,0.7)",
      },
      dock: {
        background: "rgba(17,17,19,0.55)",
        border: "rgba(255,255,255,0.06)",
        glow: "rgba(139,92,246,0.15)",
      },
      drawer: {
        background: "linear-gradient(180deg, rgba(17,17,19,0.95) 0%, rgba(9,9,11,0.95) 100%)",
        border: "rgba(255,255,255,0.04)",
        shadow: "0 30px 60px -15px rgba(0,0,0,0.7)",
      },
      wallet: {
        shine: "rgba(255,255,255,0.12)",
        border: "rgba(255,255,255,0.10)",
      },
      illustration: {
        primary: "rgba(139,92,246,0.30)",
        secondary: "rgba(16,185,129,0.30)",
      },
      category: {
        colors: {
          food: "#10B981",
          housing:  "#6366F1",
          transport: "#F59E0B",
          health: "#F43F5E",
          subscriptions: "#A855F7",
        },
      },
    },
  },

  light: {
    name: "light",
    common: {
      background: "#FAFAFA",
      surface: "#FFFFFF",
      foreground: "#09090B",
      muted: "#71717A",
      border: {
        subtle: "rgba(139,92,246,0.08)",
        strong: "rgba(139,92,246,0.15)",
      },
      primary: "#7C3AED",
      success: "#10B981",
      danger: "#EF4444",
      warning: "#F59E0B",
		  info: "#3B82F6",
      shadow: "0 20px 40px -10px rgba(139,92,246,0.05)",
    },
    dashboard: {
      plasma: {
        primary: "rgba(124,58,237,0.12)",
        income: "rgba(16,185,129,0.05)",
        expense: "rgba(239,68,68,0.03)",
      },
      glass: {
        background: "rgba(250,250,250,0.7)",
      },
      card: {
        shadow: "0 20px 40px -10px rgba(139,92,246,0.05)",
      },
      dock: {
        background: "rgba(255,255,255,0.7)",
        border: "rgba(139,92,246,0.06)",
        glow: "rgba(124,58,237,0.08)",
      },
      drawer: {
        background: "linear-gradient(180deg, rgba(243,239,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
        border: "rgba(139,92,246,0.12)",
        shadow: "0 30px 60px -15px rgba(139,92,246,0.12)",
      },
      wallet: {
				shine: "rgba(255,255,255,0.25)",
        border: "rgba(255,255,255,0.40)",
      },
      illustration: {
        primary: "rgba(124,58,237,0.25)",
        secondary: "rgba(16,185,129,0.25)",
      },
      category: {
        colors: {
          food: "#10B981",
          housing: "#6366F1",
          transport: "#F59E0B",
          health: "#F43F5E",
          subscriptions: "#A855F7",
        },
      },
    },
  },
};