import { Button, Input } from '@/components/ui';
import { useSearchHistory } from '@/hooks';
import { Clock, Search, X } from 'lucide-react';
import { ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface SearchComponentProps {
	value: string;
	placeholder?: string;
	onFilterChange: (value: string) => void;
	onSearchDone?: (value?: string) => void;
}

const SearchComponent: FC<SearchComponentProps> = ({ value, placeholder, onFilterChange, onSearchDone, ...rest }) => {
	const { getHistory, addSearch } = useSearchHistory();
	const [history, setHistory] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		setHistory(getHistory());
	}, []);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onFilterChange(event.target.value);
		},
		[onFilterChange]
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				if (!value || value.length < 3) {
					setError('Digite pelo menos 3 caracteres para buscar.');
					return;
				}
				setError(null);
				addSearch(value);
				setHistory(getHistory());
				if (onSearchDone) onSearchDone(value);
			}
		},
		[value, addSearch, getHistory, onSearchDone]
	);

	const handleSelectHistory = useCallback(
		(item: string) => {
			if (onSearchDone) onSearchDone(item);
		},
		[onSearchDone]
	);

	const handleRemoveHistory = useCallback(
		(item: string) => {
			const newHistory = history.filter((h) => h !== item);
			localStorage.setItem('search_history', JSON.stringify(newHistory));
			setHistory(newHistory);
		},
		[history]
	);

	return (
		<div className='flex flex-col gap-0 relative w-full' {...rest}>
			<div className='flex items-center gap-2 h-20 relative w-full'>
				<Search size={16} className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground' />
				<Input
					ref={inputRef}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					className='pl-9 h-20 rounded-none'
					placeholder={placeholder}
				/>
				{error && (
					<span className='absolute left-0 top-full w-full flex flex-row items-center px-6 py-2 bg-background border text-xs text-destructive border-border  z-20 '>
						{error}
					</span>
				)}
			</div>
			{history.length > 0 && (
				<div
					className='absolute left-0 w-full bg-background border border-border rounded-b-xl shadow-lg z-50'
					style={error ? { top: 'calc(100% + 2rem)' } : { top: '100%' }}
				>
					{history.map((item, idx) => (
						<div
							key={item + idx}
							className='flex flex-row items-center px-6 py-2 hover:bg-muted-foreground cursor-pointer border-b last:border-b-0'
							onClick={() => handleSelectHistory(item)}
						>
							<Clock size={16} className='mr-2 text-muted' />
							<span className='flex-1 truncate'>{item}</span>
							<Button
								size='xs'
								variant='ghost'
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveHistory(item);
								}}
								tabIndex={-1}
								aria-label='Remove from history'
							>
								<X size={20} className='text-muted hover:text-destructive' />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

SearchComponent.displayName = 'SearchComponent';

export default SearchComponent;
