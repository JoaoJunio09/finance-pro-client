import { AlertTriangle, Calendar, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { RecurrenceResponse } from "../../models/recurrence/RecurrenceResponse";
import type { RecurrenceType } from "../../types/RecurrenceType";
import { RecurrenceModal } from "../recurrenceModal/RecurrenceModal";
import { DetailsDrawer } from "./components/DetailsDrawer/DetailsDrawer";
import { EmptyRecurrencesState } from "./components/EmptyState/EmptyState";
import { FiltersDrawer } from "./components/FiltersDrawer/FiltersDrawer";
import { RecurrenceSection } from "./components/RecurrenceSection/RecurrenceSection";
import { RecurrencesHeader } from "./components/RecurrencesHeader/RecurrencesHeader";
import { RecurrencesToolbar } from "./components/RecurrencesToolbar/RecurrencesToolbar";
import { SummaryCards } from "./components/SummaryCards/SummaryCards";
import { UpcomingHighlights } from "./components/UpcomingHighlights/UpcomingHighlights";
import useRecurrences from "./hooks/useRecurrences";
import pageStyles from "../../components/shared/FinancePage/FinancePage.module.css";

export function Recurrences() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [recType] = useState<RecurrenceType>("CREDIT");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRecurrence, setSelectedRecurrence] =
    useState<RecurrenceResponse | null>(null);

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const handleToggleStatus = (recurrence: RecurrenceResponse) => {
    if (recurrence.status === "ACTIVE") {
      pause(recurrence);
    } else {
      activate(recurrence);
    }

    handleOnClose();
  };

  const handleConfirm = (recurrence: RecurrenceResponse) => {
    confirm(recurrence);
  };

  const handleEdit = (recurrence: RecurrenceResponse) => {
    setSelectedRecurrence(recurrence);
    setRecModalOpen(true);
  };

  const handleOnClose = () => {
    setSelectedRecurrence(null);
    setRecModalOpen(false);
    if (searchParams.has("nova")) {
      const next = new URLSearchParams(searchParams);
      next.delete("nova");
      setSearchParams(next, { replace: true });
    }
  };

  const { allRecurrences, confirm, pause, activate, filters, setFilters } =
    useRecurrences();

  const hasActiveFilters =
    search.trim() !== "" ||
    filters.type !== "ALL" ||
    filters.status !== "ALL" ||
    filters.frequency !== "ALL";

  const filteredRecurrences = useMemo(() => {
    if (!hasActiveFilters) return null;

    return allRecurrences?.recurrences.filter((rec) => {
      if (search.trim() !== "") {
        const query = search.toLowerCase();
        const matchesDesc = rec.description.toLowerCase().includes(query);
        if (!matchesDesc) return false;
      }

      if (filters.type === "CREDIT" && rec.type !== "CREDIT") return false;
      if (filters.type === "DEBIT" && rec.type !== "DEBIT") return false;

      if (filters.frequency === "BIWEEKLY" && rec.frequencyType !== "BIWEEKLY")
        return false;
      if (filters.frequency === "MONTHLY" && rec.frequencyType !== "MONTHLY")
        return false;
      if (filters.frequency === "YEARLY" && rec.frequencyType !== "YEARLY")
        return false;

      if (filters.status === "ACTIVE" && rec.status !== "ACTIVE") return false;
      if (filters.status === "PAUSED" && rec.status !== "PAUSED") return false;
      if (filters.status === "ENDED" && rec.status !== "ENDED") return false;

      return true;
    });
  }, [
    hasActiveFilters,
    search,
    filters.status,
    filters.frequency,
    filters.type,
    allRecurrences,
  ]);

  const isEmpty = hasActiveFilters
    ? (filteredRecurrences?.length ?? 0) === 0
    : allRecurrences?.recurrencesDueToday.length === 0 &&
      allRecurrences?.recurrencesOverdue.length === 0 &&
      allRecurrences?.recurrencesUpcoming.length === 0;

  return (
    <div className={pageStyles.page}>
      <RecurrencesHeader onNew={() => setRecModalOpen(true)} />

      <main className={pageStyles.content}>
        <SummaryCards
          count={allRecurrences?.totalActives ?? 0}
          income={allRecurrences?.totalIncomeAmount ?? 0}
          expense={allRecurrences?.totalExpenseAmount ?? 0}
        />

        <UpcomingHighlights
          items={allRecurrences?.recurrencesHighlightsOfTheWeek ?? []}
          onSelect={setSelectedRecurrence}
        />

        <div className="mb-8">
          <RecurrencesToolbar
            searchQuery={search}
            setSearchQuery={setSearch}
            filters={filters}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />
        </div>

        {isEmpty ? (
          <EmptyRecurrencesState />
        ) : (
          <div className="flex flex-col gap-10">
            {hasActiveFilters ? (
              <RecurrenceSection
                icon={Zap}
                variant="accent"
                title="Recorrências"
                description="Ações e lançamentos filtrados."
                items={filteredRecurrences ?? []}
                onSelect={setSelectedRecurrence}
                onConfirm={handleConfirm}
              />
            ) : (
              <>
                <RecurrenceSection
                  icon={Zap}
                  variant="expense"
                  title="Recorrências para Hoje"
                  description="Ações e lançamentos agendados para a data de hoje."
                  items={allRecurrences?.recurrencesDueToday ?? []}
                  onSelect={setSelectedRecurrence}
                  onConfirm={handleConfirm}
                />

                <RecurrenceSection
                  icon={AlertTriangle}
                  variant="warning"
                  title="Recorrências Pendentes"
                  description="Compromissos vencidos que requerem atenção ou confirmação."
                  items={allRecurrences?.recurrencesOverdue ?? []}
                  onSelect={setSelectedRecurrence}
                  onConfirm={handleConfirm}
                />

                <RecurrenceSection
                  icon={Calendar}
                  variant="accent"
                  title="Próximas Recorrências"
                  description="Compromissos e recebimentos previstos para datas futuras."
                  items={allRecurrences?.recurrencesUpcoming ?? []}
                  onSelect={setSelectedRecurrence}
                  onConfirm={handleConfirm}
                />
              </>
            )}
          </div>
        )}
      </main>

      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <DetailsDrawer
        item={selectedRecurrence}
        isOpen={!!selectedRecurrence}
        onClose={handleOnClose}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
      />

      {(recModalOpen || searchParams.get("nova") === "1") && (
        <RecurrenceModal
          isOpen={recModalOpen || searchParams.get("nova") === "1"}
          onClose={handleOnClose}
          initialType={recType}
          recurrence={selectedRecurrence}
        />
      )}
    </div>
  );
}

export default Recurrences;
