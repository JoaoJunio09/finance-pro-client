import { AlertTriangle, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';
import { DetailsDrawer } from './components/DetailsDrawer/DetailsDrawer';
import { EmptyRecurrencesState } from './components/EmptyState/EmptyState';
import { FiltersDrawer } from './components/FiltersDrawer/FiltersDrawer';
import { RecurrenceSection } from './components/RecurrenceSection/RecurrenceSection';
import { RecurrencesHeader } from './components/RecurrencesHeader/RecurrencesHeader';
import { RecurrencesToolbar } from './components/RecurrencesToolbar/RecurrencesToolbar';
import { SummaryCards } from './components/SummaryCards/SummaryCards';
import { UpcomingHighlights } from './components/UpcomingHighlights/UpcomingHighlights';
import useRecurrences from './hooks/useRecurrences';
import type { FiltersState, Recurrence } from './types/recurrence';
import type { RecurrenceResponse } from '../../models/recurrence/RecurrenceResponse';

export function Recurrences() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({ type: 'ALL', status: 'ALL', frequency: 'ALL' });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRecurrence, setSelectedRecurrence] = useState<RecurrenceResponse | null>(null);

  const handleDelete = (id: string) => {

  };

  const handleToggleStatus = (id: string) => {

  };

  const handleQuickConfirm = (e: React.MouseEvent, item: Recurrence) => {
  };

  const handleEdit = (_item: Recurrence) => {
    
  };

  const {
    allRecurrences
  } = useRecurrences();

  const isEmpty = 
    allRecurrences?.recurrencesDueToday.length &&
    allRecurrences?.recurrencesOverdue.length &&
    allRecurrences?.recurrencesUpcoming.length;

  console.log(allRecurrences);

  return (
    <div className="page-container">
      <RecurrencesHeader
        onNew={() => {}}
      />

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 animate-fade-in-up mt-6">
        <SummaryCards
          count={allRecurrences?.totalActives ?? 0}
          income={allRecurrences?.totalIncomeAmount ?? 0}
          expense={allRecurrences?.totalExpenseAmount ?? 0}
        />

        <UpcomingHighlights
          items={allRecurrences?.recurrencesHighlightsOfTheWeek ?? []}
          onSelect={() => {}}
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
            <RecurrenceSection
              icon={Zap}
              variant="expense"
              title="Recorrências para Hoje"
              description="Ações e lançamentos agendados para a data de hoje."
              items={allRecurrences?.recurrencesDueToday ?? []}
              onSelect={setSelectedRecurrence}
              onConfirm={() => {}}
            />

            <RecurrenceSection
              icon={AlertTriangle}
              variant="warning"
              title="Recorrências Pendentes"
              description="Compromissos vencidos que requerem atenção ou confirmação."
              items={allRecurrences?.recurrencesOverdue ?? []}
              onSelect={setSelectedRecurrence}
              onConfirm={() => {}}
            />

            <RecurrenceSection
              icon={Calendar}
              variant="accent"
              title="Próximas Recorrências"
              description="Compromissos e recebimentos previstos para datas futuras."
              items={allRecurrences?.recurrencesUpcoming ?? []}
              onSelect={setSelectedRecurrence}
              onConfirm={() => {}}
            />
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
        onClose={() => setSelectedRecurrence(null)}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onEdit={() => {}}
      />
    </div>
  );
}

export default Recurrences;