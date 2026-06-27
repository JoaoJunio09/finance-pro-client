import type { ChangeEvent, TextareaHTMLAttributes } from "react"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string
	name: string,
	value: string | number | undefined,
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, Element>) => void,
	placeholder?: string,
	className: string,
	rows: number
}

function TextArea({
	id,
	name,
	value,
	onChange,
	placeholder,
	className,
	rows
}: TextAreaProps) {
	return (
		<textarea
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={className}
			rows={rows}
		>

		</textarea>
	)
}

export default TextArea