import { useState, useEffect, useMemo } from 'react';
import { Zap, AlertTriangle, Calendar } from 'lucide-react';
import type { FiltersState, Recurrence } from './types/recurrence';
import { mockRecurrences } from './mocks/recurrenceMocks';
import { getDaysDifference } from './utils/recurrenceUtils';
import { RecurrencesHeader } from './components/RecurrencesHeader/RecurrencesHeader';
import { SummaryCards } from './components/SummaryCards/SummaryCards';
import { RecurrencesToolbar } from './components/RecurrencesToolbar/RecurrencesToolbar';
import { UpcomingHighlights } from './components/UpcomingHighlights/UpcomingHighlights';
import { EmptyRecurrencesState } from './components/EmptyState/EmptyState';
import { RecurrenceSection } from './components/RecurrenceSection/RecurrenceSection';
import { FiltersDrawer } from './components/FiltersDrawer/FiltersDrawer';
import { DetailsDrawer } from './components/DetailsDrawer/DetailsDrawer';

// ==========================================
// MAIN COMPONENT
// ==========================================
export function Recurrences() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({ type: 'ALL', status: 'ALL', frequency: 'ALL' });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Recurrence | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [recurrencesList, setRecurrencesList] = useState<Recurrence[]>(mockRecurrences);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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

  return (
    <div className="page-container">
      <RecurrencesHeader
        onNew={() => setIsCreateOpen(true)}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 animate-fade-in-up mt-6">

        {/* SUMMARY CARDS */}
        <SummaryCards
          count={summary.count}
          income={summary.income}
          expense={summary.expense}
        />

        {/* CARDS DE DESTAQUE APRIMORADOS */}
        <UpcomingHighlights
          items={upcomingHighlights}
          onSelect={setSelectedItem}
        />

        {/* TOOLBAR */}
        <div className="mb-8">
          <RecurrencesToolbar
            searchQuery={search}
            setSearchQuery={setSearch}
            filters={filters}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />
        </div>

        {/* LISTAGEM ORGANIZADA EM 3 SEÇÕES DISTINTAS */}
        {filteredData.length === 0 ? (
          <EmptyRecurrencesState />
        ) : (
          <div className="flex flex-col gap-10">

            {/* SEÇÃO 1: RECORRÊNCIAS PARA HOJE */}
            <RecurrenceSection
              icon={Zap}
              variant="expense"
              title="Recorrências para Hoje"
              description="Ações e lançamentos agendados para a data de hoje."
              items={categorizedSections.today}
              onSelect={setSelectedItem}
              onConfirm={handleQuickConfirm}
            />

            {/* SEÇÃO 2: RECORRÊNCIAS PENDENTES */}
            <RecurrenceSection
              icon={AlertTriangle}
              variant="warning"
              title="Recorrências Pendentes"
              description="Compromissos vencidos que requerem atenção ou confirmação."
              items={categorizedSections.pending}
              onSelect={setSelectedItem}
              onConfirm={handleQuickConfirm}
            />

            {/* SEÇÃO 3: PRÓXIMAS RECORRÊNCIAS */}
            <RecurrenceSection
              icon={Calendar}
              variant="accent"
              title="Próximas Recorrências"
              description="Compromissos e recebimentos previstos para datas futuras."
              items={categorizedSections.upcoming}
              onSelect={setSelectedItem}
              onConfirm={handleQuickConfirm}
            />

          </div>
        )}

      </main>

      {/* DRAWERS */}
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