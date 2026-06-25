import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode,
	variant?: 'primary' | 'secondary' | 'danger'
}

function Button({
	children,
	variant = 'primary',
	className = '',
	...props
}: ButtonProps) {
	const variants = {
		primary: 'bg-blue-500 text-white',
		secondary: 'bg-zinc-800 text-white',
		danger: 'bg-red-500 text-white'
	}

	return (
		<button
			className={`
				font-sans flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer
				${variants[variant]}
				${className}
			`}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button;