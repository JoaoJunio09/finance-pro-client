import { useState } from 'react';
import Confirm from '../../../components/ui/Confirm/Confirm';
import TopProgressBar from '../../../components/ui/TopProgressBar/TopProgressBar';
import type { RecurrenceResponse } from '../../../models/recurrence/RecurrenceResponse';
import type { RecurrenceType } from '../../../types/RecurrenceType';
import RecurrenceModal from '../../recurrenceModal/components/RecurrenceModal';
import useRecurrences from '../hooks/useRecurrences';
import Apresentation from './Apresentation';
import FilterAndSearch from './FilterAndSearch';
import FilterDrawer from './FilterDrawer';
import MonthlyImpact from './MontlyImpact';
import RecurrencesList from './RecurrencesList';
import RecurrencesOverdueList from './RecurrencesOverdueList';
import RecurrencesTodayList from './RecurrencesTodayList';
import RecurrencesUpcomingList from './RecurrencesUpcomingList';
import RecurrenceSkeleton from './RecurrenceSkeleton';

export default function Recurrences() {
	const [recurrence, setRecurrence] = useState<RecurrenceResponse | null>(null);
	const [recurrenceIdDelete, setRecurrenceIdDelete] = useState('0');
	const [isOpenModalSaveOrUpdate, setIsOpenModalSaveOrUpdate] = useState(false);
	const [isOpenModalDelete, setIsOpenModaDelete] = useState(false);
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

	function handleSaveOrUpdate(recurrence: RecurrenceResponse | null) {
		setRecurrence(recurrence);
		setIsOpenModalSaveOrUpdate(true);
	}

	function handleDelete(id: string) {
		setRecurrenceIdDelete(id);
		setIsOpenModaDelete(true);
	}

	function handleCloseModal() {
		setIsOpenModaDelete(false);
	}

	const {
		allRecurrences,
		recurrences,
		isLoading,
		isFetching,
		isLoadingSave,
		search,
		setSearch,
		setType: setTypeFilter,
		type: typeFilter,
		setFrequencyType,
		frequencyType,
		setExecutionType,
		executionType,
		setSort,
		sort,
		activeFiltersCount,
		clearFilters,
		deleteRecurrence
	} = useRecurrences(handleCloseModal);

	const type: RecurrenceType = recurrence?.type === 'CREDIT' ? 'CREDIT' : 'DEBIT';

  return (
		<main className="flex-1 w-full min-w-0 flex flex-col relative z-10">
			{(isLoading || isFetching) && (
				<TopProgressBar />
			)}

			{isLoading ? (
				<RecurrenceSkeleton />
			) : (
				<div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col w-full">
					<Apresentation
						onNewRecurrence={handleSaveOrUpdate}
					/>

					<MonthlyImpact
						totalRegistered={allRecurrences?.totalRegistered ?? 0}
						totalIncomeAmount={allRecurrences?.totalIncomeAmount ?? 0}
						totalExpenseAmount={allRecurrences?.totalExpenseAmount ?? 0}
						monthlyImpact={allRecurrences?.monthlyImpact ?? 0}
					/>	

					<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">
						<div className="flex flex-col order-2 lg:order-1 min-w-0 animate-slide-up delay-100">	
							<FilterAndSearch
								setSearch={setSearch}
								search={search}
								setIsFilterDrawerOpen={setIsFilterDrawerOpen}
								activeFiltersCount={activeFiltersCount}
							/>

							<RecurrencesList
								recurrences={recurrences ?? []}
								onEdit={handleSaveOrUpdate}
								onDelete={handleDelete}
							/>
						</div>

						<div className="flex flex-col gap-[16px] order-1 lg:order-2 lg:sticky lg:top-8 w-full animate-slide-up delay-100">
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
								recurrences={allRecurrences?.recurrencesUpcoming ?? []}
							/>
						</div>
					</div>
				</div>
			)}
			
			{isFilterDrawerOpen && (
				<FilterDrawer
					setIsFilterDrawerOpen={setIsFilterDrawerOpen}
					setType={setTypeFilter}
					type={typeFilter}
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

			{isOpenModalSaveOrUpdate && (
				<RecurrenceModal
					isOpen={isOpenModalSaveOrUpdate}
					onClose={() => setIsOpenModalSaveOrUpdate(false)}
					type={type}
					recurrence={recurrence}
				/>
			)}

			{isOpenModalDelete && (
				<Confirm
					type='warning'
					title='Remover Recorrêcia? Esta ação não poderá ser desfeita.'
					message='Ao remover a Recorrência da sua conta, todas as transações referentes a ela serão automaticamente removidas. Caso não seja isso que queira, desative ao invés de remover.'
					buttonText='Remover'
					isLoading={isLoadingSave}
					onCancel={() => setIsOpenModaDelete(false)}
					onConfirm={() => deleteRecurrence(recurrenceIdDelete)}
				/>
			)}
      
			<div className="h-28 md:h-0"></div>
		</main>
  );
}