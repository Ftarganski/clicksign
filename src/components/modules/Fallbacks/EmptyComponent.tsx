import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { FC, ReactNode } from 'react';

export interface EmptyComponentProps {
	title: string;
	description?: string;
	icon?: ReactNode;
	button?: string;
	linkTo?: string;
}

export const EmptyComponent: FC<EmptyComponentProps> = ({ title, description, button, icon, linkTo, ...rest }) => {
	return (
		<div className='flex flex-col gap-8 justify-center rounded-sm items-center bg-card p-4 h-full' {...rest}>
			<div className='text-2xl font-semibold text-primary'>{title}</div>
			<div className='font-normal text-muted'>{description}</div>
			{button && (
				<Link to={linkTo}>
					<Button variant='default' size='lg' className='rounded-full '>
						{icon}
						{button}
					</Button>
				</Link>
			)}
		</div>
	);
};

EmptyComponent.displayName = 'EmptyComponent';

export default EmptyComponent;
