import { refreshFinancialData } from "../../../utils/refreshFinancialData";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useTransactionService from "../../../hooks/useTransactionService";
import useWalletService from "../../../hooks/useWalletService";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { CategoryType } from "../../../types/CategoryType";
import type { TransactionStatus } from "../../../types/TransactionStatus";
import type { TransactionType } from "../../../types/TransactionType";
import {
  formatCurrencyInput,
  formatCurrencyToAPI,
} from "../../../utils/FormatCurrency";
import type { TxFormData } from "../types/TxFormData";
import useInstallmentPlanService from "../../../hooks/useInstallmentPlanService";
import type { InstallmentPlanRequest } from "../../../models/installmentPlan/InstallmentPlanRequest";
import { getPurchaseInvoices } from "../../../utils/invoices";

function useTransactionModal(
  transaction: TransactionResponse | null,
  initialType: TransactionType,
  onClose: () => void
) {
  const [categoryType, setCategoryType] = useState<CategoryType>(
    initialType === "CREDIT" ? "CREDIT" : "DEBIT"
  );

  const now = new Date();
  const localOffset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now.getTime() - localOffset).toISOString();

  const [form, setForm] = useState<TxFormData>({
    id: "",
    amount: "",
    description: "",
    date: localISOTime.split("T")[0],
    time: localISOTime.split("T")[1].substring(0, 5),
    type: initialType ?? "CREDIT",
    status: "COMPLETED",
    installments: 1,
    interestRate: 0,
  });

  const { account } = useAccountContext();

  const transactionService = useTransactionService();
  const categoryService = useCategoryService();
  const walletService = useWalletService();
  const installmentPlanService = useInstallmentPlanService();

  const queryClient = useQueryClient();

  const queryCategories = useQuery({
    queryKey: ["categories", categoryType],
    queryFn: () => categoryService.getAll({ type: categoryType }),
    retry: 3,
    placeholderData: keepPreviousData,
  });

  const queryWallets = useQuery({
    queryKey: ["wallets", account?.id],
    queryFn: () => walletService.getAll({ accountId: account?.id }),
    enabled: Boolean(account?.id),
    retry: 3,
  });

  const txMutationSave = useMutation({
    mutationFn: (data: TransactionRequest) => transactionService.create(data),
    onSuccess: () => {
      void refreshFinancialData(queryClient);
      showToast({
        title: "Adicionado",
        message: "Receita ou despesa registrada com sucesso.",
        type: "success",
      });
      onClose();
    },
  });

  const txMutationUpdate = useMutation({
    mutationFn: (data: TransactionRequest) => transactionService.update(data),
    onSuccess: () => {
      void refreshFinancialData(queryClient);
      showToast({
        title: "Atualizado",
        message: "Registro atualizado com sucesso.",
        type: "success",
      });
      onClose();
    },
  });

  const installmentMutationCreate = useMutation({
    mutationFn: (data: InstallmentPlanRequest) =>
      installmentPlanService.create(data),
    onSuccess: () => {
      void refreshFinancialData(queryClient);
      showToast({
        title: "Parcelamento adicionado",
        message: "A compra foi vinculada à fatura selecionada.",
        type: "success",
      });
      onClose();
    },
    onError: () => {
      showToast({
        title: "Não foi possível registrar a compra",
        message: "Confira a fatura antes de tentar novamente.",
        type: "error",
      });
    },
  });

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "amount") {
      setForm((prev) => ({
        ...prev,
        amount: formatCurrencyInput(value),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function changeType(type: TransactionType) {
    setForm((prev) => ({ ...prev, type: type }));
    setCategoryType(type === "CREDIT" ? "CREDIT" : "DEBIT");
  }

  function changeStatus(status: TransactionStatus) {
    setForm((prev) => ({ ...prev, status: status }));
  }

  function changeCustomSelectCategory(category: CategoryResponse) {
    setForm((prev) => ({ ...prev, category: category }));
  }

  function changeCustomSelectWallet(wallet: WalletResponse) {
    setForm((prev) => ({
      ...prev,
      wallet,
      invoiceId: getPurchaseInvoices(wallet.invoices ?? [])[0]?.id,
    }));
  }

  function saveOrUpdate() {
    if (!account?.id || !form.category || !form.wallet) return;
    if (
      txMutationSave.isPending ||
      txMutationUpdate.isPending ||
      installmentMutationCreate.isPending
    )
      return;

    const isUpdate = transaction?.id;

    const request: TransactionRequest = {
      id: form.id,
      amount: formatCurrencyToAPI(form.amount),
      description: form.description,
      type: form.type,
      status: form.status,
      registeredAt: `${form.date}T${form.time}`,
      accountId: account?.id,
      categoryId: form.category?.id,
      walletId: form.wallet?.id,
    };

    if (isUpdate) {
      txMutationUpdate.mutate(request);
    } else {
      if (form.wallet.type === "CREDIT_CARD") {
        const currentWallet =
          queryWallets.data?.find((item) => item.id === form.wallet?.id) ??
          form.wallet;
        const invoice = getPurchaseInvoices(currentWallet.invoices ?? []).find(
          (item) => item.id === form.invoiceId
        );
        if (!invoice || form.type !== "DEBIT") {
          showToast({
            title: "Confira a fatura",
            message:
              "Selecione uma fatura aberta para registrar uma compra como despesa.",
            type: "warning",
          });
          return;
        }
        if (
          !Number.isInteger(Number(form.installments)) ||
          Number(form.installments) < 1 ||
          !Number.isFinite(Number(form.interestRate)) ||
          Number(form.interestRate) < 0 ||
          !Number.isFinite(Number(form.amount)) ||
          Number(form.amount) <= 0
        ) {
          showToast({
            title: "Valores inválidos",
            message: "Revise o valor, as parcelas e os juros.",
            type: "warning",
          });
          return;
        }
        const installmentPlan: InstallmentPlanRequest = {
          description: form.description,
          value: Number(form.amount),
          times: Number(form.installments),
          fees: Number(form.interestRate),
          status: "PAYING",
          invoiceId: invoice.id,
        };

        installmentMutationCreate.mutate(installmentPlan);
      } else {
        txMutationSave.mutate(request);
      }
    }
  }

  const categories = useMemo(
    () => queryCategories.data ?? [],
    [queryCategories.data]
  );
  const wallets = useMemo(() => queryWallets.data ?? [], [queryWallets.data]);

  useEffect(() => {
    if (!transaction) return;

    setCategoryType(transaction.type === "CREDIT" ? "CREDIT" : "DEBIT");

    setForm({
      id: transaction.id,
      amount: transaction.amount.toFixed(2),
      description: transaction.description,
      date: transaction.registeredAt.split("T")[0],
      time: transaction.registeredAt.split("T")[1].substring(0, 5),
      type: transaction.type,
      status: transaction.status,
      installments: 1,
      interestRate: 0,
      category: transaction.category,
      wallet: transaction.wallet,
    });
  }, [transaction]);

  useEffect(() => {
    if (transaction || categories.length === 0) return;

    setForm((prev) => ({
      ...prev,
      category: categories[0],
    }));
  }, [transaction, categories]);

  useEffect(() => {
    if (transaction || !initialType) return;

    setCategoryType(initialType === "CREDIT" ? "CREDIT" : "DEBIT");
    setForm((prev) => ({ ...prev, type: initialType }));
  }, [initialType, transaction]);

  return {
    categories,
    wallets,
    walletsLoading: queryWallets.isLoading,
    walletsError: queryWallets.isError,
    refetchWallets: queryWallets.refetch,
    form,
    handleOnChange,
    changeType,
    changeStatus,
    changeCustomSelectCategory,
    changeCustomSelectWallet,
    saveOrUpdate,
    isSaving:
      txMutationSave.isPending ||
      txMutationUpdate.isPending ||
      installmentMutationCreate.isPending,
  };
}

export default useTransactionModal;
