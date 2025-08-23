import { Button } from '@/components/ui';
import { useProcessedData } from '@/hooks';
import { useListProjects } from '@/hooks/queries';
import { Link } from '@tanstack/react-router';
import { PlusCircle, Search } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteComponent from '../Filters/FavoriteComponent';
import FilterComponent from '../Filters/FilterComponent';
import SearchComponent from '../Filters/SearchComponent';
import CardProject from './CardProject';

export interface ListProjectsProps {}

export const ListProjects: FC<ListProjectsProps> = ({ ...rest }) => {
	const { t } = useTranslation();
	const projects = useListProjects();
	const [showFavorites, setShowFavorites] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [sortValue, setSortValue] = useState('name');

	const sortOptions = [
		{ value: 'name', label: t('projects.filters.alphabetical') },
		{ value: 'startDate', label: t('projects.filters.recentStart') },
		{ value: 'endDate', label: t('projects.filters.closestEnd') },
	];

	const [sortBy, sortDirection] = sortValue.split('-');

	const filteredProjects = useProcessedData({
		data:
			projects.mock && Array.isArray(projects.mock)
				? showFavorites
					? projects.mock.filter((p: any) => p.isFavorite)
					: projects.mock
				: [],
		sortBy: sortBy as any,
		sortDirection: sortDirection as any,
	}).data;

	const [searchOpen, setSearchOpen] = useState(false);

	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!searchOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSearchOpen(false);
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [searchOpen]);

	useEffect(() => {
		if (!searchOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setSearchOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [searchOpen]);

	return (
		<div className='flex flex-col justify-between items-start gap-10 p-4 h-full' {...rest}>
			<div className='absolute top-7 right-7 items-center justify-end h-full'>
				<Search className='text-card cursor-pointer' onClick={() => setSearchOpen(true)} />
			</div>
			<div className='flex flex-row justify-between items-start gap-10 w-full'>
				<div className='flex flex-row gap-2 items-center'>
					<div className='text-2xl font-semibold text-primary'>{t('projects.title')}</div>
					<div className='font-normal text-primary-foreground'>({filteredProjects.length})</div>
				</div>

				<div className='flex flex-row gap-6 items-center'>
					<FavoriteComponent
						label={t('projects.filters.favorites')}
						checked={showFavorites}
						onCheckedChange={setShowFavorites}
					/>
					<FilterComponent value={sortValue} options={sortOptions} onFilterChange={setSortValue} />
					<Link to={'/projects/newproject'}>
						<Button variant='default' size='default' className='rounded-full '>
							<PlusCircle />
							{t('projects.emptyList.button')}
						</Button>
					</Link>
				</div>
			</div>
			<div className='flex flex-wrap gap-4'>
				{filteredProjects.map((project: any, idx: number) => (
					<CardProject key={project.id || idx} project={project} />
				))}
			</div>

			{searchOpen && (
				<div
					ref={searchRef}
					className='fixed top-0 left-0 w-full h-20 z-50 bg-secondary flex items-center animate-fade-in'
				>
					<SearchComponent
						value={searchValue}
						onFilterChange={setSearchValue}
						placeholder={t('projects.filters.searchPlaceholder')}
					/>
				</div>
			)}
		</div>
	);
};

ListProjects.displayName = 'ListProjects';

export default ListProjects;
