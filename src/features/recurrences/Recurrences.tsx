import { AlertTriangle, Calendar, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { DetailsDrawer } from './components/DetailsDrawer/DetailsDrawer';
import { EmptyRecurrencesState } from './components/EmptyState/EmptyState';
import { FiltersDrawer } from './components/FiltersDrawer/FiltersDrawer';
import { RecurrenceSection } from './components/RecurrenceSection/RecurrenceSection';
import { RecurrencesHeader } from './components/RecurrencesHeader/RecurrencesHeader';
import { RecurrencesToolbar } from './components/RecurrencesToolbar/RecurrencesToolbar';
import { SummaryCards } from './components/SummaryCards/SummaryCards';
import { UpcomingHighlights } from './components/UpcomingHighlights/UpcomingHighlights';
import { mockRecurrences } from './mocks/recurrenceMocks';
import type { FiltersState, Recurrence } from './types/recurrence';
import { getDaysDifference } from './utils/recurrenceUtils';
import useRecurrences from './hooks/useRecurrences';

export function Recurrences() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({ type: 'ALL', status: 'ALL', frequency: 'ALL' });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Recurrence | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [recurrencesList, setRecurrencesList] = useState<Recurrence[]>(mockRecurrences);

  const handleDelete = (id: string) => {
    setRecurrencesList(prev => prev.filter(r => r.id !== id));
    setSelectedItem(null);
  };

  const handleToggleStatus = (id: string) => {
    setRecurrencesList(prev => prev.map(r =>
      r.id === id ? { ...r, status: r.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : r
    ));
    setSelectedItem(prev => prev && prev.id === id
      ? { ...prev, status: prev.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
      : prev
    );
  };

  const handleQuickConfirm = (e: React.MouseEvent, item: Recurrence) => {
    e.stopPropagation();
    alert(`Recorrência "${item.description}" confirmada e registrada no fluxo financeiro!`);
  };

  const handleEdit = (_item: Recurrence) => {
    setSelectedItem(null);
    setIsCreateOpen(true);
  };

  // Filtragem base dos dados
  const filteredData = useMemo(() => {
    return recurrencesList.filter(item => {
      const matchSearch = item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.category.name.toLowerCase().includes(search.toLowerCase());
      const matchType = filters.type === 'ALL' || item.type === filters.type;
      const matchStatus = filters.status === 'ALL' || item.status === filters.status;
      const matchFreq = filters.frequency === 'ALL' || item.frequency === filters.frequency;

      return matchSearch && matchType && matchStatus && matchFreq;
    });
  }, [search, filters, recurrencesList]);

  // Divisão em 3 Seções Claras
  const categorizedSections = useMemo(() => {
    const today: Recurrence[] = [];
    const pending: Recurrence[] = [];
    const upcoming: Recurrence[] = [];

    filteredData.forEach(item => {
      if (!item.nextDate) {
        upcoming.push(item);
        return;
      }

      const diffDays = getDaysDifference(item.nextDate);

      if (diffDays === 0) {
        today.push(item);
      } else if (diffDays !== null && diffDays < 0 && item.status === 'ACTIVE') {
        pending.push(item);
      } else {
        upcoming.push(item);
      }
    });

    return { today, pending, upcoming };
  }, [filteredData]);

  // Destaques superiores (semana)
  const upcomingHighlights = useMemo(() => {
    return recurrencesList
      .filter(item => item.status === 'ACTIVE' && item.nextDate && getDaysDifference(item.nextDate)! >= 0 && getDaysDifference(item.nextDate)! <= 15)
      .sort((a, b) => getDaysDifference(a.nextDate)! - getDaysDifference(b.nextDate)!);
  }, [recurrencesList]);

  // Totais
  const summary = useMemo(() => {
    const active = recurrencesList.filter(i => i.status === 'ACTIVE');
    const income = active.filter(i => i.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = active.filter(i => i.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
    return { count: active.length, income, expense };
  }, [recurrencesList]);

  const {
    allRecurrences
  } = useRecurrences();

  console.log(allRecurrences);

  return (
    <div className="page-container">
      <RecurrencesHeader
        onNew={() => setIsCreateOpen(true)}
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

        {filteredData.length === 0 ? (
          <EmptyRecurrencesState />
        ) : (
          <div className="flex flex-col gap-10">
            <RecurrenceSection
              icon={Zap}
              variant="expense"
              title="Recorrências para Hoje"
              description="Ações e lançamentos agendados para a data de hoje."
              items={allRecurrences?.recurrencesDueToday ?? []}
              onSelect={() => {}}
              onConfirm={() => {}}
            />

            <RecurrenceSection
              icon={AlertTriangle}
              variant="warning"
              title="Recorrências Pendentes"
              description="Compromissos vencidos que requerem atenção ou confirmação."
              items={allRecurrences?.recurrencesOverdue ?? []}
              onSelect={() => {}}
              onConfirm={() => {}}
            />

            <RecurrenceSection
              icon={Calendar}
              variant="accent"
              title="Próximas Recorrências"
              description="Compromissos e recebimentos previstos para datas futuras."
              items={allRecurrences?.recurrencesUpcoming ?? []}
              onSelect={() => {}}
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
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Recurrences;