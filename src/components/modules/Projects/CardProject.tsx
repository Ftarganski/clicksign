import { Button, Card, Popover, Separator } from '@/components/ui';
import { Calendar1, CalendarCheck, CircleEllipsis, SquarePen, Star, Trash } from 'lucide-react';

import { formatDateLong, getHighlightedName } from '@/helpers';
import type { Project } from '@/types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface CardProjectProps {
	project: Pick<Project, 'name' | 'client' | 'startDate' | 'endDate' | 'isFavorite'> & { imageUrl?: string };
	highlight?: string;
	handleEdit: () => void;
	handleDelete: () => void;
	handleFavorite?: () => void;
}

export const CardProject: FC<CardProjectProps> = ({
	project,
	highlight = '',
	handleEdit,
	handleDelete,
	handleFavorite,
	...rest
}) => {
	const { t } = useTranslation();

	return (
		<Card.Root className='bg-card border-border gap-6 w-full sm:w-[346px] py-0 rounded-2xl' {...rest}>
			<Card.Header
				className='h-[208px] bg-primary rounded-t-2xl pt-6 px-0 flex items-end justify-end bg-cover bg-center'
				style={{
					backgroundImage: `url('${project.imageUrl || '/images/fallbackProject.png'}')`,
				}}
				aria-hidden='true'
			>
				<div className='flex text-card flex-row items-center gap-3 mb-4 mr-4'>
					<div
						className='hover:cursor-pointer'
						aria-label={project.isFavorite ? t('commons.buttons.unfavorite') : t('commons.buttons.favorite')}
						onClick={handleFavorite}
					>
						<Star
							size={28}
							className='text-card'
							fill={project.isFavorite ? 'var(--color-warning, #ffb300)' : 'none'}
						/>
					</div>
					<Popover.Root>
						<Popover.Trigger className='hover:cursor-pointer' asChild>
							<CircleEllipsis size={28} className='text-primary-foreground' fill={'#ffffff'} />
						</Popover.Trigger>
						<Popover.Content className='p-0 w-52' align='end'>
							<Button
								variant='link'
								size='lg'
								className='border-none w-full justify-start p-4 hover:bg-muted-foreground'
								onClick={handleEdit}
							>
								<SquarePen />
								<div>{t('commons.buttons.edit')}</div>
							</Button>
							<Separator />
							<Button
								variant='link'
								size='lg'
								className='border-none w-full justify-start p-4 hover:bg-muted-foreground'
								onClick={handleDelete}
							>
								<Trash />
								<div>{t('commons.buttons.delete')}</div>
							</Button>
						</Popover.Content>
					</Popover.Root>
				</div>
			</Card.Header>
			<Card.Content className='flex flex-col justify-between gap-2 h-[180px] pb-6'>
				<div className='ellipsis truncate overflow-hidden whitespace-nowrap text-primary text-2xl font-extrabold'>
					{getHighlightedName(project.name, highlight)}
				</div>
				<div className='flex flex-row gap-2'>
					<div className='text-secondary-foreground text-base font-bold'>{t('project.client')}</div>
					<div className='ellipsis truncate overflow-hidden whitespace-nowrap text-secondary-foreground text-base font-normal'>
						{project.client}
					</div>
				</div>
				<Separator />
				<div className='flex flex-row gap-3'>
					<Calendar1 className='text-secondary-foreground' />
					<div className='text-secondary-foreground text-base font-normal'>{formatDateLong(project.startDate)}</div>
				</div>
				<div className='flex flex-row gap-3'>
					<CalendarCheck className='text-secondary-foreground' />
					<div className='text-secondary-foreground text-base font-normal'>{formatDateLong(project.endDate)}</div>
				</div>
			</Card.Content>
		</Card.Root>
	);
};

CardProject.displayName = 'CardProject';

export default CardProject;
