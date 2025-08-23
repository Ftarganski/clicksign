import { Button } from '@/components/ui';
import { useListProjects } from '@/hooks/queries';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteComponent from '../Filters/FavoriteComponent';
import FilterComponent from '../Filters/FilterComponent';
import CardProject from './CardProject';

export interface ListProjectsProps {}

export const ListProjects: FC<ListProjectsProps> = ({ ...rest }) => {
	const { t } = useTranslation();
	const projects = useListProjects();
	return (
		<div className='flex flex-col justify-between items-start gap-10 p-4 h-full' {...rest}>
			<div className='flex flex-row justify-between items-start gap-10 p-4 w-full'>
				<div className='flex flex-row gap-2 items-center'>
					<div className='text-2xl font-semibold text-primary-foreground'>{t('projects.title')}</div>
					<div className='font-normal text-primary'>(9)</div>
				</div>

				<div className='flex flex-row gap-6 items-center'>
					<FavoriteComponent label={t('projects.filters.favorites')} checked={false} onCheckedChange={() => {}} />
					<FilterComponent
						value={''}
						options={[]}
						onFilterChange={function (value: string): void {
							throw new Error('Function not implemented.');
						}}
					/>
					<Button variant='default' size='lg' className='rounded-full '>
						icon button
					</Button>
				</div>
			</div>

			{projects.data && projects.data[0] && <CardProject project={projects.data[0]} />}
		</div>
	);
};

ListProjects.displayName = 'ListProjects';

export default ListProjects;
