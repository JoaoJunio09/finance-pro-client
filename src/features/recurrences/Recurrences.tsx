import { useState, useMemo } from 'react';
import { RecurrencesToolbar } from './components/RecurrencesToolbar/RecurrencesToolbar';
import { RecurrenceCard } from './components/RecurrenceCard/RecurrenceCard';

import styles from './Recurrences.module.css';
import { Inbox } from 'lucide-react';
import type { ActiveTab, Recurrence, SortOption } from './types/recurrence';
import { INITIAL_RECURRENCES } from './mocks/recurrenceMocks';
import { RecurrencesHeader } from './components/RecurrenceHeader/RecurrenceHeader';
import { SummaryCards } from './SummaryCards/SummaryCards';
import { RecurrencesAnalysis } from './components/RecurrencesAnalytics/RecurrencesAnalytics';

function Recurrences() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('nextDate');
  const [recurrences] = useState<Recurrence[]>(INITIAL_RECURRENCES);

  // Lógica de Filtro e Busca
  const filteredRecurrences = useMemo(() => {
    return recurrences.filter((rec) => {
      const matchesTab = 
        activeTab === 'all' ? true :
        activeTab === 'active' ? rec.status === 'active' :
        rec.type === activeTab;
      
      const matchesSearch = rec.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [recurrences, activeTab, searchTerm]);

  // Lógica de Ordenação
  const sortedRecurrences = useMemo(() => {
    return [...filteredRecurrences].sort((a, b) => {
      switch (sortBy) {
        case 'nextDate':
          if (!a.nextDate) return 1;
          if (!b.nextDate) return -1;
          return new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime();
        case 'highest':
          return b.amount - a.amount;
        case 'lowest':
          return a.amount - b.amount;
        case 'recent':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        default:
          return 0;
      }
    });
  }, [filteredRecurrences, sortBy]);

  const handleOpenAddModal = () => {
    console.log('Abrir modal de nova recorrência');
    // Implementar lógica de modal futuramente
  };

  const handleCardClick = (id: string) => {
    console.log('Detalhes da recorrência:', id);
    // Implementar navegação ou modal de detalhes
  };

  return (
    <div className={`relative w-full ${styles.pageContainer}`}>
      
      {/* Header com as Tabs */}
      <RecurrencesHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAddModal={handleOpenAddModal} 
      />

      {/* Área de Conteúdo Principal */}
      <div className={`w-full mt-4 sm:mt-6 pt-6 px-4 sm:px-6 lg:px-8 pb-12 transition-colors relative z-10 ${styles.listContainer}`}>
        <div className="max-w-[1400px] mx-auto flex flex-col">
          
          <SummaryCards recurrences={recurrences} />
          
          <RecurrencesAnalysis recurrences={recurrences} />
          
          <div className="w-full h-px bg-gray-200/50 my-6" />
          
          <RecurrencesToolbar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
          />

          {/* Lista de Cards */}
          <div className="flex flex-col gap-3 sm:gap-4 animate-fade-in">
            {sortedRecurrences.map(recurrence => (
              <RecurrenceCard 
                key={recurrence.id} 
                recurrence={recurrence} 
                onClick={handleCardClick} 
              />
            ))}

            {/* Empty State */}
            {sortedRecurrences.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4 rounded-2xl border border-dashed border-gray-300">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Inbox size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Nenhuma regra encontrada</h3>
                <p className={`text-sm max-w-md ${styles.emptyText}`}>
                  Não encontramos nenhuma recorrência que corresponda aos filtros atuais. Tente mudar a aba ou o termo de busca.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Recurrences;