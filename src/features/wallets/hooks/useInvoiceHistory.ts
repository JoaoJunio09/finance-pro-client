import { useState } from "react";
import type { InvoiceResponse } from "../../../models/invoice/InvoiceResponse";
import { getInvoiceVisualStatus, sortInvoices } from "../../../utils/invoices";
import type { InvoiceHistoryFilter } from "../types/invoice";

function useInvoiceHistory(invoices: InvoiceResponse[]) {

	const [filter, setFilter] = useState<InvoiceHistoryFilter>('ALL');
	const [year, setYear] = useState('');

	const sorted = sortInvoices(invoices);
	const years = [...new Set(sorted.map(invoice => invoice.closingDate?.slice(0, 4)).filter(Boolean))];

	const filtered = sorted.filter(invoice => {
		const status = getInvoiceVisualStatus(invoice);
		return (!year || invoice.closingDate?.startsWith(year))
			&& (filter === 'ALL' || (filter === 'OPEN' ? status !== 'PAID' : status === filter));
	});

	const filters: { value: InvoiceHistoryFilter; label: string }[] = [
    { value: 'ALL', label: 'Todas' },
    { value: 'OPEN', label: 'Em aberto' },
    { value: 'PAID', label: 'Pagas' },
    { value: 'EXPIRED', label: 'Vencidas' },
  ];

	return {
		filter,
		setFilter,
		year,
		setYear,
		years,
		filtered,
		filters
	}
}

export default useInvoiceHistory;