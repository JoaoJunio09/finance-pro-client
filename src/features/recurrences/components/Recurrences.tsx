import { useState } from 'react';
import useRecurrences from '../hooks/useRecurrences';
import Apresentation from './Apresentation';
import FilterAndSearch from './FilterAndSearch';
import MonthlyImpact from './MontlyImpact';
import RecurrencesList from './RecurrencesList';
import RecurrencesOverdueList from './RecurrencesOverdueList';
import RecurrencesTodayList from './RecurrencesTodayList';
import RecurrencesUpcomingList from './RecurrencesUpcomingList';
import FilterDrawer from './FilterDrawer';

export default function Recurrences() {
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
	const {
		allRecurrences,
		loading,
		setType,
		type,
		setFrequencyType,
		frequencyType,
		setExecutionType,
		executionType,
		setSort,
		sort,
		activeFiltersCount,
		clearFilters
	} = useRecurrences();

  return (
		<main className="flex-1 w-full min-w-0 flex flex-col relative z-10 animate-slide-up">
			<div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col w-full">
				<Apresentation />

				<MonthlyImpact
					totalRegistered={allRecurrences?.totalRegistered ?? 0}
					totalIncomeAmount={allRecurrences?.totalIncomeAmount ?? 0}
					totalExpenseAmount={allRecurrences?.totalExpenseAmount ?? 0}
					monthlyImpact={allRecurrences?.monthlyImpact ?? 0}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">
					
					<div className="flex flex-col order-2 lg:order-1 min-w-0">	
						<FilterAndSearch
							setIsFilterDrawerOpen={setIsFilterDrawerOpen}
							activeFiltersCount={activeFiltersCount}
						/>

						<RecurrencesList
							recurrences={allRecurrences?.recurrences ?? []}
						/>
					</div>

					<div className="flex flex-col gap-[16px] order-1 lg:order-2 lg:sticky lg:top-8 w-full">
						{allRecurrences?.recurrencesOverdue && allRecurrences?.recurrencesOverdue.length > 0 && (
							<RecurrencesOverdueList
								recurrences={allRecurrences.recurrencesOverdue ?? []}
							/>
						)}
						{allRecurrences?.recurrencesDueToday && allRecurrences?.recurrencesDueToday.length > 0 && (
							<RecurrencesTodayList
								recurrences={allRecurrences?.recurrencesDueToday ?? []}
							/>
						)}

						<RecurrencesUpcomingList
							recurrences={allRecurrences?.recurrences ?? []}
						/>
					</div>
				</div>

				{isFilterDrawerOpen && (
        <FilterDrawer
					setIsFilterDrawerOpen={setIsFilterDrawerOpen}
					setType={setType}
					type={type}
					setFrequencyType={setFrequencyType}
					frequencyType={frequencyType}
					setExecutionType={setExecutionType}
					executionType={executionType}
					setSort={setSort}
					sortType={sort}
					activeFiltersCount={activeFiltersCount}
					clearFilters={clearFilters}
				/>
      )}
			</div>

      
		</main>
  );
}