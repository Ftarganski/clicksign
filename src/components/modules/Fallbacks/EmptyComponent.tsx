import { Button } from '@/components/ui';
import { FC, ReactNode } from 'react';

export interface EmptyComponentProps {
	title: string;
	description?: string;
	icon?: ReactNode;
	button?: string;
}

export const EmptyComponent: FC<EmptyComponentProps> = ({ title, description, button, icon, ...rest }) => {
	return (
		<div className='flex flex-col gap-10 justify-center items-center bg-card p-4 h-full' {...rest}>
			<div className='text-2xl font-semibold text-primary-foreground'>{title}</div>
			<div className='font-normal text-muted'>{description}</div>
			{button && (
				<Button variant='default' size='lg' className='rounded-full '>
					{icon}
					{button}
				</Button>
			)}
		</div>
	);
};

EmptyComponent.displayName = 'EmptyComponent';

export default EmptyComponent;
