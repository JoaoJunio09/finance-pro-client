import { AlertTriangle, Calendar, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { RecurrenceResponse } from '../../models/recurrence/RecurrenceResponse';
import { DetailsDrawer } from './components/DetailsDrawer/DetailsDrawer';
import { EmptyRecurrencesState } from './components/EmptyState/EmptyState';
import { FiltersDrawer } from './components/FiltersDrawer/FiltersDrawer';
import { RecurrenceSection } from './components/RecurrenceSection/RecurrenceSection';
import { RecurrencesHeader } from './components/RecurrencesHeader/RecurrencesHeader';
import { RecurrencesToolbar } from './components/RecurrencesToolbar/RecurrencesToolbar';
import { SummaryCards } from './components/SummaryCards/SummaryCards';
import { UpcomingHighlights } from './components/UpcomingHighlights/UpcomingHighlights';
import useRecurrences from './hooks/useRecurrences';
import { RecurrenceModal } from '../recurrenceModal/RecurrenceModal';
import type { RecurrenceType } from '../../types/RecurrenceType';

export function Recurrences() {
  const [search, setSearch] = useState('');
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [recType, setRecType] = useState<RecurrenceType>('CREDIT');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRecurrence, setSelectedRecurrence] = useState<RecurrenceResponse | null>(null);

  const handleDelete = (id: string) => {

  };

  const handleToggleStatus = (id: string) => {

  };

  const handleConfirm = (recurrence: RecurrenceResponse) => {
    confirm(recurrence);
  };

  const handleEdit = (_item: RecurrenceResponse) => {
    
  };

  const {
    allRecurrences,
    confirm,
    filters,
    setFilters
  } = useRecurrences();

  const hasActiveFilters =
    search.trim() !== '' ||
    filters.type !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.frequency !== 'ALL';

  const filteredRecurrences = useMemo(() => {
    if (!hasActiveFilters) return null;

    return allRecurrences?.recurrences.filter(rec => {
      if (search.trim() !== '') {
        const query = search.toLowerCase();
        const matchesDesc = rec.description.toLowerCase().includes(query);
        if (!matchesDesc) return false;
      }

      if (filters.type === 'CREDIT' && rec.type !== 'CREDIT') return false;
      if (filters.type === 'DEBIT' && rec.type !== 'DEBIT') return false;

      if (filters.frequency === 'BIWEEKLY' && rec.frequencyType !== 'BIWEEKLY') return false;
      if (filters.frequency === 'MONTHLY' && rec.frequencyType !== 'MONTHLY') return false;
      if (filters.frequency === 'YEARLY' && rec.frequencyType !== 'YEARLY') return false;

      if (filters.status === 'ACTIVE' && rec.status !== 'ACTIVE') return false;
      if (filters.status === 'PAUSED' && rec.status !== 'PAUSED') return false;
      if (filters.status === 'ENDED' && rec.status !== 'ENDED') return false;

      return true;
    });
  }, [hasActiveFilters, search, filters.status, filters.frequency, filters.type, allRecurrences]);

  const isEmpty = hasActiveFilters
    ? (filteredRecurrences?.length ?? 0) === 0
    : (
        allRecurrences?.recurrencesDueToday.length === 0 &&
        allRecurrences?.recurrencesOverdue.length === 0 &&
        allRecurrences?.recurrencesUpcoming.length === 0
      );

  return (
    <div className="page-container">
      <RecurrencesHeader
        onNew={() => setRecModalOpen(true)}
      />

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 animate-fade-in-up mt-6">
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
        onClose={() => setSelectedRecurrence(null)}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onEdit={() => {}}
      />

      <RecurrenceModal
        isOpen={recModalOpen}
        onClose={() => setRecModalOpen(!recModalOpen)}
        initialType={recType}
        isEditing={false}
      />
    </div>
  );
}

export default Recurrences;