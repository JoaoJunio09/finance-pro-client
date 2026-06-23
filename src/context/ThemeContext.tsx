import { createContext, useContext, useState, type ReactNode } from "react"
import type { CurrentThemeProps } from "../props/CurrentThemeProps";

const THEME_SHEETS = {
	colors: {
		// Modo Escuro Premium (Default)
		dark: {
			bg: '#090A0F',
			card: '#12131A',
			hover: '#181A24',
			border: 'rgba(255, 255, 255, 0.04)',
			textPrimary: '#F3F4F6',
			textSecondary: '#8F95B2',
			shadow: 'rgba(0, 0, 0, 0.6)',
			overlay: 'rgba(0, 0, 0, 0.8)'
		},
		// Modo Claro Premium
		light: {
			bg: '#F8FAFC',
			card: '#FFFFFF',
			hover: '#F1F5F9',
			border: 'rgba(15, 23, 42, 0.05)',
			textPrimary: '#0F172A',
			textSecondary: '#64748B',
			shadow: 'rgba(15, 23, 42, 0.03)',
			overlay: 'rgba(15, 23, 42, 0.2)'
		},
		brand: {
			primary: '#4F7CFF', // Azul Stripe/Linear
			primaryHover: '#3D66DB',
			accentPurp: '#9B5DE5',
		},
		success: '#10B981',
		successBg: 'rgba(16, 185, 129, 0.08)',
		error: '#EF4444',
		errorBg: 'rgba(239, 68, 68, 0.08)',
		warning: '#F59E0B',
		warningBg: 'rgba(245, 158, 11, 0.08)',
		categories: {
			food: { label: 'Alimentação', color: '#FF6B6B', icon: '🍔', bg: 'rgba(255, 107, 107, 0.12)' },
			transport: { label: 'Transporte', color: '#4ECDC4', icon: '🚗', bg: 'rgba(78, 205, 196, 0.12)' },
			leisure: { label: 'Lazer', color: '#FFD93D', icon: '🎬', bg: 'rgba(255, 217, 61, 0.12)' },
			housing: { label: 'Moradia', color: '#9B5DE5', icon: '🏠', bg: 'rgba(155, 93, 229, 0.12)' },
			income: { label: 'Entradas', color: '#10B981', icon: '💰', bg: 'rgba(16, 185, 129, 0.12)' }
		}
	}
};

export type ThemeType = 'dark' | 'light';

type ThemeContextType = {
	theme: ThemeType,
	changeTheme: () => void,
	currentTheme: CurrentThemeProps,
	THEME_SHEETS: any,
}

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
	children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<ThemeType>('dark');

	const currentTheme = theme === 'dark' ? THEME_SHEETS.colors.dark : THEME_SHEETS.colors.light;

	function changeTheme() {
		if (theme === 'dark') {
			setTheme('light');
		}
		else {
			setTheme('dark');
		}
	}

	return (
		<ThemeContext
			value={{
				theme,
				changeTheme,
				currentTheme,
				THEME_SHEETS
			}}
		>
			{children}
		</ThemeContext>
	)
}

export function useThemeContext() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useThemeContext deve ser usado dentro de ThemeProvider");
	}

	return context;
}