import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { FC, ReactNode } from 'react';

export interface EmptyComponentProps {
	title: string;
	description?: string;
	icon?: ReactNode;
	button?: string;
}

export const EmptyComponent: FC<EmptyComponentProps> = ({ title, description, button, icon, ...rest }) => {
	return (
		<div className='flex flex-col gap-8 justify-center rounded-sm items-center bg-card p-4 h-full' {...rest}>
			<div className='text-2xl text-center font-semibold text-primary'>{title}</div>
			<div className='font-normal text-center text-muted'>{description}</div>
			{button && (
				<Link to={'/projects/projectform'} search={{ mode: 'create' }}>
					<Button variant='default' size='default' className='rounded-full '>
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
