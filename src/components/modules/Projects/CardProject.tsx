import { Card, Separator } from '@/components/ui';
import { Calendar1, CalendarCheck, CircleEllipsis, Star } from 'lucide-react';

import type { Project } from '@/types/project';
import { FC } from 'react';

export interface CardProjectProps {
	project: Pick<Project, 'name' | 'client' | 'startDate' | 'endDate'>;
}

export const CardProject: FC<CardProjectProps> = ({ project, ...rest }) => {
	return (
		<Card.Root className='bg-card border-muted gap-6 w-[322px] py-0' {...rest}>
			<Card.Header
				className='h-[208px] bg-primary rounded-t-2xl pt-6 px-0 flex items-end justify-end'
				style={{
					backgroundImage: "url('/images/fallbackProject.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='flex text-card flex-row gap-3 mb-4 mr-4'>
					<Star fill={'#ffb300'} />
					<CircleEllipsis className='text-primary' fill={'#ffffff'} />
				</div>
			</Card.Header>
			<Card.Content className='flex flex-col justify-between gap-2 h-[180px] pb-6'>
				<div className='text-primary-foreground text-2xl font-extrabold'>{project.name}</div>
				<div className='flex flex-row gap-2'>
					<div className='text-muted-foreground text-base font-bold'>Cliente</div>
					<div className='text-muted-foreground text-base font-normal'>{project.client}</div>
				</div>
				<Separator />
				<div className='flex flex-row gap-3'>
					<Calendar1 className='text-muted-foreground' />
					<div className='text-muted-foreground text-base font-normal'>{project.startDate}</div>
				</div>
				<div className='flex flex-row gap-3'>
					<CalendarCheck className='text-muted-foreground' />
					<div className='text-muted-foreground text-base font-normal'>{project.endDate}</div>
				</div>
			</Card.Content>
		</Card.Root>
	);
};

CardProject.displayName = 'CardProject';

export default CardProject;
