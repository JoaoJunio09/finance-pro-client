import type { TransactionType } from "../../../../types/TransactionType";
import type { Action } from "../types/Actions";
import type { NavigateFunction } from "react-router-dom";
import showToast from "../../../ui/Toast/Toast";

export const handleOnClickBtnAction = (
  action: Action,
  selectTxType: (type: TransactionType) => void,
  handleOpenTxModal: () => void,
  onClose: () => void,
  navigate: NavigateFunction
) => {
  switch (action.type) {
    case "income":
      selectTxType("CREDIT");
      handleOpenTxModal();
      break;
    case "expense":
      selectTxType("DEBIT");
      handleOpenTxModal();
      break;
    case "recurrence":
      navigate("/vida-financeira/recorrencias?nova=1");
      break;
    case "wallet":
      navigate("/carteiras?nova=1");
      break;
    case "trasfer":
      showToast({
        type: "info",
        title: "Transferência",
        message: "O registro de transferências ainda não está disponível.",
      });
      break;
  }

  onClose();
};
