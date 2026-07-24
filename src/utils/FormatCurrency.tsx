export const formatCurrencyLabel = (val: number) => {
	const hasDecimal = val % 1 !== 0;

	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: hasDecimal ? 2 : 0,
		maximumFractionDigits: 2,
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

export function getIntegerPart(value: number): string {
	return Math.trunc(value).toLocaleString('pt-BR');
}

export function getDecimalPart(value: number): string {
	return value.toFixed(2).split('.')[1];
}