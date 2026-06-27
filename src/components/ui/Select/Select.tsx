import type { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	id: string
	name: string,
	value: string | number | undefined,
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, Element>) => void,
	className: string,
	children: ReactNode
}

function Select({
	id,
	name,
	value,
	onChange,
	className,
	children
}: SelectProps) {
	return (
		<select
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			defaultValue=""
			className={className}
		>
			{children}
		</select>
	)
}

export default Select;