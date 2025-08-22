import { FC } from 'react';

export interface EmptyComponentProps {
	message?: string;
}

export const EmptyComponent: FC<EmptyComponentProps> = ({ message }) => {
	return (
		<div className='flex flex-col gap-10 justify-center items-center p-4'>
			<div className='flex flex-col gap-2'>
				<div className='text-center text-9xl px-10 font-semibold text-foreground'>404</div>
			</div>

			<div className='text-center text-2xl px-10 font-semibold text-foreground'>{message}</div>
		</div>
	);
};

EmptyComponent.displayName = 'EmptyComponent';

export default EmptyComponent;
