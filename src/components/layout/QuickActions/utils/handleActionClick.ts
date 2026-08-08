import type { TransactionType } from "../../../../types/TransactionType";
import type { Action } from "../types/Actions";

export const handleOnClickBtnAction = (
	action: Action,
	selectTxType: (type: TransactionType) => void,
	handleOpenTxModal: () => void,
	onClose: () => void
) => {
	switch (action.type) {
		case 'income':
			selectTxType('CREDIT');
			handleOpenTxModal();
			break;
		case 'expense':
			selectTxType('DEBIT');
			handleOpenTxModal();
			break;
	}
	
	onClose();
}