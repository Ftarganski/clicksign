import { Input } from '@/components/ui';
import { Search } from 'lucide-react';
import { ChangeEvent, FC, useCallback } from 'react';

export interface SearchComponentProps {
	value: string;
	placeholder?: string;
	onFilterChange: (value: string) => void;
}

const SearchComponent: FC<SearchComponentProps> = ({ value, placeholder, onFilterChange, ...rest }) => {
	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onFilterChange(event.target.value);
		},
		[onFilterChange]
	);

	return (
		<div className='flex items-center gap-2 h-20 relative w-full' {...rest}>
			<Search size={16} className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground' />
			<Input value={value} onChange={handleChange} className='pl-9 h-20 rounded-none' placeholder={placeholder} />
		</div>
	);
};

SearchComponent.displayName = 'SearchComponent';

export default SearchComponent;
