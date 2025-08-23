import { Button } from '@/components/ui';
import { useListProjects } from '@/hooks/queries';
import { Link } from '@tanstack/react-router';
import { PlusCircle } from 'lucide-react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteComponent from '../Filters/FavoriteComponent';
import FilterComponent from '../Filters/FilterComponent';
import CardProject from './CardProject';
export interface ListProjectsProps {
	highlight?: string;
}

const ListProjects: FC<ListProjectsProps> = ({ highlight = '', ...rest }) => {
	const { t } = useTranslation();
	const projects = useListProjects();
	const [showFavorites, setShowFavorites] = useState(false);
	const [sortValue, setSortValue] = useState('name');

	const sortOptions = [
		{ value: 'name', label: t('projects.filters.alphabetical') },
		{ value: 'startDate', label: t('projects.filters.recentStart') },
		{ value: 'endDate', label: t('projects.filters.closestEnd') },
	];

	const [sortBy, sortDirection] = sortValue.split('-');

	// Show all projects, no search filter
	const allProjects =
		projects.mock && Array.isArray(projects.mock)
			? showFavorites
				? projects.mock.filter((p: any) => p.isFavorite)
				: projects.mock
			: [];

	return (
		<div className='flex flex-col justify-between items-start gap-10 p-4 h-full' {...rest}>
			<div className='flex flex-row justify-between items-start gap-10 w-full'>
				<div className='flex flex-row gap-2 items-center'>
					<div className='text-2xl font-semibold text-primary'>{t('projects.title')}</div>
					<div className='font-normal text-primary-foreground'>({allProjects.length})</div>
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
				{allProjects.map((project: any, idx: number) => (
					<CardProject
						key={project.id || idx}
						project={project}
						highlight={highlight && highlight.length >= 3 ? highlight : ''}
					/>
				))}
			</div>
		</div>
	);
};

ListProjects.displayName = 'ListProjects';

export default ListProjects;
