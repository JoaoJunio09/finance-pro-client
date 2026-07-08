export const formatCurrencyLabel = (val: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(val);
};

export function formatCurrencyInput(value: string) {
	const onlyNumbers = value.replace(/\D/g, '');

	const number = Number(onlyNumbers) / 100;

	return number.toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

export function formatCurrencyToAPI(value: string) {
	return Number(
			value
				.replace(/\./g, '')
				.replace(',', '.')
		);
}