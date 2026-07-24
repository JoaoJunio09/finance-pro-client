import { Search, SlidersHorizontal } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import styles from '../TransactionsTimeline.module.css';

interface SearchTransactionProps {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
}

function SearchTransaction({
	search,
	setSearch
}: SearchTransactionProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
			<div className="flex w-full gap-3 justify-end">
				<div className={`flex-1 flex items-center py-2 px-4 rounded-2xl ${styles.searchBox}`}>
					<Search size={16} className={`mr-3 ${styles.searchIcon}`} />
					<input
						type="text"
						placeholder="Pesquisar transações..."
						className={`w-full text-sm ${styles.searchInput}`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<button
					className={`flex items-center justify-center p-3 rounded-2xl ${styles.filterButton}`}
					aria-label="Abrir filtros avançados"
				>
					<SlidersHorizontal size={16} />
				</button>
			</div>
		</div>
	)
}

export default SearchTransaction;