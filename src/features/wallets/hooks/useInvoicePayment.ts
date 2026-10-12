import { useState } from "react";
import { getInvoiceVisualStatus } from "../../../utils/invoices";
import type { InvoiceDetails } from "../../../models/invoice/InvoiceDetails";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";

function useInvoicePayment(
	details: InvoiceDetails,
	wallets: WalletResponse[],
	installmentId?: string
) {
	const [paymentWalletId, setPaymentWalletId] = useState('');

	const isExpired = getInvoiceVisualStatus(details) === 'EXPIRED';
	const selectedWallet = wallets.find(wallet => wallet.id === paymentWalletId);

	const installments = details.installments.filter(item =>
		!item.paid && (!installmentId || item.id === installmentId));
	const amount = installmentId ? (installments[0]?.value ?? 0) : details.pendingAmount;
	const insufficientBalance = selectedWallet && selectedWallet.balance < amount;
	
	const canPay = Boolean(selectedWallet) && !insufficientBalance && amount > 0
		&& details.status !== 'PAID' && Boolean(details.closingDate && details.expirationDate);

	const paymentTitle = installmentId
		? 'Registrar parcela paga'
		: isExpired ? 'Pagar fatura vencida' : 'Registrar fatura paga';
	const confirmationLabel = installmentId
		? 'Confirmar parcela paga'
		: isExpired ? 'Confirmar pagamento da fatura vencida' : 'Confirmar fatura paga';

	return {
		paymentWalletId,
		setPaymentWalletId,
		selectedWallet,
		installments,
		amount,
		insufficientBalance,
		canPay,
		paymentTitle,
		confirmationLabel
	}
}

export default useInvoicePayment;