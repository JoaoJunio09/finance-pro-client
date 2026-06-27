import { type ChangeEvent, type InputHTMLAttributes } from "react";
import type { NEW_TRANSACTION_MODAL_CONFIG_TYPE } from "../../../features/newTransaction/types/NewTransactionModalConfigs";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string,
	name: string,
	type: string,
	inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined,
	placeholder?: string,
	value: string | number,
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, Element>) => void,
	className: string,
	config?: NEW_TRANSACTION_MODAL_CONFIG_TYPE
}

function Input({
	id,
  name,
  type,
  inputMode,
  placeholder,
  value,
  onChange,
  config,
	className
}: InputProps) {
	return (
		<input
			id={id}
			name={name}
			type={type}
			inputMode={inputMode}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`
				${className ? className : 'w-full text-black px-1 bg-gray-200 h-10'}
			`}
			style={{
				caretColor: config?.color,
			}}
		/>
	)
}

export default Input;