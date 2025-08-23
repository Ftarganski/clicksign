import { Button } from '@/components/ui';
import { FC } from 'react';
import FavoriteComponent from '../Filters/FavoriteComponent';
import FilterComponent from '../Filters/FilterComponent';
import CardProject from './CardProject';

export interface ListProjectsProps {}

export const ListProjects: FC<ListProjectsProps> = ({ ...rest }) => {
	return (
		<div className='flex flex-col justify-between  items-start gap-10 p-4 h-full' {...rest}>
			<div className='flex flex-row justify-between items-start gap-10 p-4 w-full'>
				<div className='flex flex-row gap-2 items-center'>
					<div className='text-2xl font-semibold text-primary-foreground'>Projetos</div>
					<div className='font-normal text-primary'>(9)</div>
				</div>

				<div className='flex flex-row gap-6 items-center'>
					<FavoriteComponent label={'Apenas Favoritos'} checked={false} onCheckedChange={() => {}} />
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

			<CardProject
				project={{
					name: '',
					client: '',
					startDate: '',
					endDate: '',
				}}
			/>
		</div>
	);
};

ListProjects.displayName = 'ListProjects';

export default ListProjects;
