import { useCallback } from 'react';

const STORAGE_KEY = 'search_history';
const MAX_HISTORY = 5;

/**
 * Hook to manage search history in localStorage (last 5 searches).
 * @returns Functions to get, add, and clear search history
 */
export function useSearchHistory() {
	/**
	 * Retrieves the search history from localStorage.
	 * @returns Array of last search strings
	 */
	const getHistory = useCallback((): string[] => {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) return [];
			return JSON.parse(data) as string[];
		} catch {
			return [];
		}
	}, []);

	/**
	 * Adds a new search to the history (ignores duplicates, keeps max 5).
	 * @param search - Search string to add
	 */
	const addSearch = useCallback(
		(search: string) => {
			if (!search || search.length < 3) return;
			let history = getHistory();
			// Remove duplicates and add to the top
			history = [search, ...history.filter((item) => item !== search)];
			if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
		},
		[getHistory]
	);

	/**
	 * Clears the search history from localStorage.
	 */
	const clearHistory = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
	}, []);

	return {
		getHistory,
		addSearch,
		clearHistory,
	};
}
